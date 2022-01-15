// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "./AvatarFactory.sol";

contract AvatarModification is AvatarFactory {
    modifier onlyOwnerOf(uint256 _avatarId) {
        require(msg.sender == avatarToOwner[_avatarId]);
        _;
    }

    function modifyHp(uint256 _avatarId, uint256 _delta)
        external
        onlyOwnerOf(_avatarId)
    {
        avatars[_avatarId].hp = avatars[_avatarId].hp + (uint64(_delta));
    }

    function modifyAttack(uint256 _avatarId, uint256 _delta)
        external
        onlyOwnerOf(_avatarId)
    {
        avatars[_avatarId].hp = avatars[_avatarId].hp + (uint64(_delta));
    }

    function modifyXp(uint256 _avatarId, uint256 _delta)
        external
        onlyOwnerOf(_avatarId)
    {
        avatars[_avatarId].hp = avatars[_avatarId].hp + (uint64(_delta));
    }
}
