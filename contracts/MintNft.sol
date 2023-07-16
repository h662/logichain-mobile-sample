// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MintNft is ERC721Enumerable {


    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    mapping(uint => string) metadataUris;

    function mintNft(string memory _metadataUri) public {
        uint tokenId = totalSupply() + 1;

        _mint(msg.sender, tokenId);

        metadataUris[tokenId] = _metadataUri;
    }

    function tokenURI(uint _tokenId) public override view returns(string memory) {
        return metadataUris[_tokenId];
    }

    function getAllNfts(address _owner) public view returns(uint[] memory) {
        uint balanceOf = balanceOf(_owner);

        require(balanceOf > 0, "Not exist NFT.");

        uint[] memory nfts = new uint[](balanceOf);

        for(uint i = 0; i < balanceOf; i++) {
            nfts[i] = tokenOfOwnerByIndex(_owner, i);
        }

        return nfts;
    }
}