// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract EquipmentContract is ERC1155 {
    using SafeMath for uint256;

    uint public constant EQUIP1 = 0;
    uint public constant EQUIP2 = 1;
    uint public constant EQUIP3 = 2;
    mapping (uint => uint) public equipAttack;
    mapping (uint => uint) public equipHp;

    constructor(uint [] memory _attackBoosts, uint [] memory _hpBoosts) ERC1155("") {
        for (uint i = 0; i < _attackBoosts.length; i++) {
            equipAttack[i] = _attackBoosts[i];
            equipHp[i] = _hpBoosts[i];
        }
    }

<<<<<<< HEAD
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
=======
    function mint(uint _id, uint _amount) public payable {
        require ((_id < 3) && (_id >= 0), "token doesn't exist");
        _mint(msg.sender, _id, _amount, "");
>>>>>>> ade2fedfc9dc3124e641e6d03a56b862a85dd404
    }
}
