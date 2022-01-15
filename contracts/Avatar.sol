// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract AvatarTokens is ERC1155 {
    using SafeMath for uint256;

    address public governance;
    uint256 public avatarCount;
    uint256 public hp;
    uint256 public attack;
    uint256 public xp;

    modifier onlyGovernance() {
        require(msg.sender == governance, "Only governance can call this");
        _;
    }

    constructor(address governance_) ERC1155("") {
        governance = governance_;
        hp = 10;
        attack = 10;
        xp = 0;
    }

    function addNewAvatar(uint256 initialSupply) external onlyGovernance {
        avatarCount++;
        uint256 avatarTokenClassId = avatarCount;

        _mint(msg.sender, avatarTokenClassId, initialSupply, "");        
    }
}