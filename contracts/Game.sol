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
import "./ChainlinkClient.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Game is Ownable {
    TokenContract token;
    EquipmentContract equip;
    AvatarOwnership avatar;
    RandomNumberConsumer randGenerator;
    APIConsumer chainlink;

    mapping(address => uint256) public stakedTokens;

    constructor(
        TokenContract _tokenAddress,
        EquipmentContract _equip,
        AvatarOwnership _avatar,
        RandomNumberConsumer _randGenerator,
        APIConsumer _chainlink
    ) {
        token = _tokenAddress;
        equip = _equip;
        avatar = _avatar;
        randGenerator = _randGenerator;
        chainlink = _chainlink;
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

    function fetchBattleResults(uint _battleId) external {
        string memory url = string(
                                abi.encodePacked(
                                    "http://b8c5-99-241-141-46.ngrok.io/get_result?battleId=",
                                    Strings.toString(_battleId)
                                )
                            );
        chainlink.requestData(url, _battleId);
    }

    // Give user their tokens * 2 + one new equipment
    function battleEnds(uint _battleId) external {
        require(chainlink.idToResult(_battleId) != 0, "Still pending fetching the result");

        // TODO fix rand with VRF and figure out how to mock in test
        //uint rand = _getRandFromGenerator(_battleId);
        uint256 rand = 0;

        bool userWon = chainlink.idToResult(_battleId) == 1 ? true : false;
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
