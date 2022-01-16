// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract AvatarFactory is Ownable {
    using SafeMath for uint256;
    using SafeMath for uint64;
    using SafeMath for uint32;

    struct Avatar {
        uint32 level;
        uint64 attackPoints;
        uint64 hp;
        uint64 xp;
    }

    Avatar[] public avatars;
    mapping(uint256 => address) public avatarToOwner;
}

// For testing purposes, since we can't test internal functions
contract ExposedAvatarFactory {
    using SafeMath for uint256;
    using SafeMath for uint64;
    using SafeMath for uint32;

    struct Avatar {
        uint32 level;
        uint64 attackPoints;
        uint64 hp;
        uint64 xp;
    }

    Avatar[] public avatars;
    mapping(uint256 => address) public avatarToOwner;
}
