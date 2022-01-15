// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract EquipmentContract is ERC1155 {
    using SafeMath for uint256;

    uint256 public constant EQUIP1 = 0;
    uint256 public constant EQUIP2 = 1;
    uint256 public constant EQUIP3 = 2;
    mapping(uint256 => uint256) public equipAttack;
    mapping(uint256 => uint256) public equipHp;

    constructor(uint256[] memory _attackBoosts, uint256[] memory _hpBoosts)
        ERC1155("")
    {
        for (uint256 i = 0; i < _attackBoosts.length; i++) {
            equipAttack[i] = _attackBoosts[i];
            equipHp[i] = _hpBoosts[i];
        }
    }

    function mint(uint256 _id, uint256 _amount) public payable {
        require((_id < 3) && (_id >= 0), "token doesn't exist");
        _mint(msg.sender, _id, _amount, "");
    }

    function mintWithAddress(
        address _address,
        uint256 _id,
        uint256 _amount
    ) public payable {
        require((_id < 3) && (_id >= 0), "token doesn't exist");
        _mint(_address, _id, _amount, "");
    }

    function getEquipmentStats(uint256 equipId)
        external
        view
        returns (uint256, uint256)
    {
        return (equipAttack[equipId], equipHp[equipId]);
    }
}
