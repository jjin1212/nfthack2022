// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract EquipmentTokens is ERC1155 {
    using SafeMath for uint256;

    address public governance;
    uint256 public equipmentCount;
    uint256 public attackBoost;
    uint256 public hpBoost;

    modifier onlyGovernance() {
        require(msg.sender == governance, "Only governance can call this");
        _;
    }

    constructor(
        address governance_,
        uint256 attackBoost_,
        uint256 hpBoost_
    ) ERC1155("") {
        governance = governance_;
        attackBoost = attackBoost_;
        hpBoost = hpBoost_;
    }

    function addNewEquipment(uint256 initialSupply) external onlyGovernance {
        equipmentCount++;
        uint256 equipmentTokenClassId = equipmentCount;

        _mint(msg.sender, equipmentTokenClassId, initialSupply, "");
    }
}
