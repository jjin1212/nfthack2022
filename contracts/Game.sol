// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Game {
    // let the user stake amount token

    function stake(uint amount) {
        // require msg.sender $token `amount` > amount;
    }

    // let the user unstake `amount` token
    //
    function unstake(uint amount) {
        // require amount < staked[msg.sender];
    }

    // function to calculate the battle result. Return true for a win, false for a lose
    // this should take into account the strength of the user's character and gears
    function _calculateBattleResult(uint battleId, uint charId, uint gear1Id, uint gear2Id, uint gear3Id) {
        // formula to calculate the battle result;
        // can use Chainlink VRF for randomness;
    }

    // calculate the reward of a battle
    function _calculateBattleReward(uint battleId) {
                
    }

    // calculate the staked token loss of a battle
    function _calculateBattleLoss(uint battleId, address user) {
        // take a portion of staked[user];
    }
}