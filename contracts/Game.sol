// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Equipment.sol";
import "./RandomNumberConsumer.sol";
import "./AvatarOwnership.sol";
import "./Token.sol";

contract Game is Ownable {
    TokenContract token;
    EquipmentContract equip;
    AvatarOwnership avatar;
    RandomNumberConsumer randGenerator;

    mapping(address => uint256) public stakedTokens;

    constructor(
        TokenContract _tokenAddress,
        EquipmentContract _equip,
        AvatarOwnership _avatar,
        RandomNumberConsumer _randGenerator
    ) {
        token = _tokenAddress;
        equip = _equip;
        avatar = _avatar;
        randGenerator = _randGenerator;
    }

    function stake(uint256 _amount) external payable {
        require(token.balanceOf(msg.sender) >= _amount, "insufficient balance");
        require(_amount >= 0, "staking negative value");
        token.transferFrom(msg.sender, address(this), _amount);
        stakedTokens[msg.sender] += _amount;
    }

    function unstake(uint256 _amount) external payable {
        require(
            stakedTokens[msg.sender] >= _amount,
            "insufficient staked balance"
        );
        require(_amount >= 0, "unstaking negative value");
        token.transfer(msg.sender, _amount);
        stakedTokens[msg.sender] -= _amount;
    }

    // Give user their tokens * 2 + one new equipment
    function battleResults(uint256 _battleId) external {
        // TODO check if battleId belongs to the sender either here or Backend

        // TODO fix rand with VRF and figure out how to mock in test
        //uint rand = _getRandFromGenerator(_battleId);
        uint256 rand = 0;

        // TODO: fetch battle result from Backend
        bool userWon = true;
        uint256 stakedAmount = stakedTokens[msg.sender];

        if (userWon) {
            // Mint more token for sender and unstake previously staked
            token.mintWithAddress(msg.sender, stakedAmount);
            token.transfer(msg.sender, stakedAmount);
            stakedTokens[msg.sender] -= stakedAmount;

            // Mint equipment
            equip.mintWithAddress(msg.sender, rand % 3, 1);
        } else {
            // lose half of the staked token
            stakedTokens[msg.sender] -= stakedAmount / 2;
        }
    }

    function _getRandFromGenerator(uint256 _id) private returns (uint256 rand) {
        randGenerator.getRandomNumber(_id);
        return randGenerator.getRandomResultForId(_id);
    }
}
