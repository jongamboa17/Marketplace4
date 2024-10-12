// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721 {
    // Variable to track the next token ID for minting
    uint256 public nextTokenId;

    // Constructor that initializes the ERC721 contract with a name and symbol
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        // Start token IDs at 1
        nextTokenId = 1;
    }

    // Public function to mint a new NFT to the specified address
    function mint(address to) public {
        // Mint the new NFT to the given address with the current token ID
        _mint(to, nextTokenId);
        // Increment the token ID for the next mint
        nextTokenId++;
    }

    // Function to approve a marketplace contract to manage all NFTs of the caller
    function approveMarketplace(address marketplace) public {
        // Approve the marketplace to transfer the caller's NFTs
        setApprovalForAll(marketplace, true);
    }
}
