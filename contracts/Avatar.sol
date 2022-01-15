// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./AvatarFactory.sol";
import "./AvatarModification.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract AvatarOwnership is ERC721, AvatarModification {
    uint256 maxSupply;

    constructor(uint256 _maxSupply) ERC721("avatarNFT", "AVATAR") {
        maxSupply = _maxSupply - 1;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://foo.com/assets/";
    }

    function mint() public payable {
        require(avatars.length <= maxSupply, "Sold out");
        require(msg.value == 0.0 ether, "Incorrect amount");

        uint256 avatarTokenId = _createAvatarAndGetId();
        _safeMint(msg.sender, avatarTokenId);
    }
}
