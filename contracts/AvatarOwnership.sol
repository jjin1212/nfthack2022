// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./AvatarFactory.sol";
import "./AvatarModification.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract AvatarOwnership is ERC721Enumerable, AvatarModification {
    using SafeMath for uint256;

    uint256 public maxSupply;

    constructor(uint256 _maxSupply) ERC721("avatarNFT", "AVATAR") {
        maxSupply = _maxSupply;
    }

    // Will probably need this for updating
    modifier isOwnerOf(uint256 avatarId) {
        require(msg.sender == avatarToOwner[avatarId]);
        _;
    }

    function mint() public payable {
        require(avatars.length < maxSupply, "Sold out");

        uint256 tokenId = _createAvatarAndGetId();
        _safeMint(msg.sender, tokenId);
    }

    function getAvatarStats(uint256 avatarId)
        external
        view
        returns (
            uint32,
            uint64,
            uint64,
            uint64
        )
    {
        require(avatars.length > avatarId);
        Avatar storage avatar = avatars[avatarId];
        return (avatar.level, avatar.attackPoints, avatar.hp, avatar.xp);
    }
}
