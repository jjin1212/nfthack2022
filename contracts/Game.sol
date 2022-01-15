// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Game is Ownable {
    IERC20 token;
    mapping (address => uint) public stakedTokens;

    constructor(IERC20 _tokenAddress) {
        token = _tokenAddress;
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
        token.transferFrom(address(this), msg.sender, _amount);
        stakedTokens[msg.sender] -= _amount;
    }

    // // function to calculate the battle result. Return true for a win, false for a lose
    // // this should take into account the strength of the user's character and gears
    // function _calculateBattleResult(uint battleId, uint charId, uint gear1Id, uint gear2Id, uint gear3Id) {
    //     // formula to calculate the battle result;
    //     // can use Chainlink VRF for randomness;
    // }

    // // calculate the reward of a battle
    // function _calculateBattleReward(uint battleId) {
                
    // }

    // // calculate the staked token loss of a battle
    // function _calculateBattleLoss(uint battleId, address user) {
    //     // take a portion of staked[user];
    // }
}