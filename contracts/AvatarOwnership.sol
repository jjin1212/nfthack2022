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

    function mint() public payable {
        require(avatars.length <= maxSupply, "Sold out");

        uint256 avatarTokenId = _createAvatarAndGetId();
        _safeMint(msg.sender, avatarTokenId);
    }
}
