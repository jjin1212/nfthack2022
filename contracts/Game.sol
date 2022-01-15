// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import './Equipment.sol';
import './RandomNumberConsumer.sol';
import './AvatarOwnership.sol';
import './Token.sol';

contract Game is Ownable {
    TokenContract token;
    EquipmentContract equip;
    AvatarOwnership avatar;
    RandomNumberConsumer randGenerator;

    mapping (address => uint) public stakedTokens;

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

    function stake(uint _amount) external payable {
        require(token.balanceOf(msg.sender) >= _amount, "insufficient balance");
        require(_amount >= 0, "staking negative value");
        token.transferFrom(msg.sender, address(this), _amount);
        stakedTokens[msg.sender] += _amount;
    }

    function unstake(uint _amount) external payable {
        require(stakedTokens[msg.sender] >= _amount, "insufficient staked balance");
        require(_amount >= 0, "unstaking negative value");
        token.transfer(msg.sender, _amount);
        stakedTokens[msg.sender] -= _amount;
    }

    // Give user their tokens * 2 + one new equipment
    function battleResults(uint _battleId) external {
        // TODO check if battleId belongs to the sender either here or Backend

        // TODO fix rand with VRF and figure out how to mock in test
        //uint rand = _getRandFromGenerator(_battleId);
        uint rand = 3;
        
        // TODO: fetch battle result from Backend
        bool userWon = true;
        uint stakedAmount = stakedTokens[msg.sender];
        
        if (userWon) {
            // Mint more token for sender and unstake previously staked
            token.mintWithAddress(msg.sender, stakedAmount);
            token.transfer(msg.sender, stakedAmount);
            stakedTokens[msg.sender] -= stakedAmount;

            // Mint equipment
            //equip.mint(rand % 3, 1);
        } else {
            // lose half of the staked token
            stakedTokens[msg.sender] -= stakedAmount / 2;
        }        
    }

    function _getRandFromGenerator(uint _id) private returns (uint rand) {
        randGenerator.getRandomNumber(_id);
        return randGenerator.getRandomResultForId(_id);
    }
}
