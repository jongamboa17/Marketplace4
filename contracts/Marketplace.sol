// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract Marketplace is Ownable, Pausable {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool sold;
    }

    Listing[] public listings;
    mapping(address => mapping(uint256 => bool)) public activeListings;

    // Modifier to ensure only the seller can modify their listing
    modifier onlySeller(uint256 listingId) {
        require(
            listings[listingId].seller == msg.sender,
            "You are not the seller"
        );
        _;
    }

    // Events to indicate important state changes
    event NFTListed(
        address indexed seller,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price
    );
    event NFTSold(
        address indexed buyer,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price
    );
    event ListingCanceled(
        address indexed seller,
        address indexed nftContract,
        uint256 indexed tokenId
    );
    event ListingPriceUpdated(
        address indexed seller,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 newPrice
    );

    // Constructor: initializes the contract in a non-paused state
    constructor() Ownable(msg.sender) {}

    // Only the owner of the contract can pause the marketplace
    function pause() public onlyOwner {
        _pause();
    }

    // Only the owner of the contract can unpause the marketplace
    function unpause() public onlyOwner {
        _unpause();
    }

    // Check if a listing is active
    function isActiveListing(
        address nftContract,
        uint256 tokenId
    ) external view returns (bool) {
        return activeListings[nftContract][tokenId];
    }

    // List an NFT in the marketplace
    function listNFT(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) external whenNotPaused {
        require(price > 0, "Price must be greater than 0");
        require(
            IERC721(nftContract).supportsInterface(0x80ac58cd),
            "Contract is not ERC721"
        );
        require(
            IERC721(nftContract).ownerOf(tokenId) == msg.sender,
            "You are not the owner"
        );

        // Ensure the marketplace is approved to transfer the NFT
        require(
            IERC721(nftContract).getApproved(tokenId) == address(this) ||
                IERC721(nftContract).isApprovedForAll(
                    msg.sender,
                    address(this)
                ),
            "Marketplace is not approved to transfer this NFT"
        );

        // Create the listing without transferring the NFT
        listings.push(Listing(msg.sender, nftContract, tokenId, price, false));
        activeListings[nftContract][tokenId] = true;

        emit NFTListed(msg.sender, nftContract, tokenId, price);
    }

    // Buy a listed NFT
    function buyNFT(uint256 listingId) external payable whenNotPaused {
        Listing storage listing = listings[listingId];
        require(msg.value == listing.price, "Incorrect price");
        require(!listing.sold, "NFT already sold");

        // Ensure the marketplace is still approved to transfer the NFT
        require(
            IERC721(listing.nftContract).getApproved(listing.tokenId) ==
                address(this) ||
                IERC721(listing.nftContract).isApprovedForAll(
                    listing.seller,
                    address(this)
                ),
            "Marketplace is not approved to transfer this NFT"
        );

        // Mark as sold before making external calls
        listing.sold = true;
        activeListings[listing.nftContract][listing.tokenId] = false;

        // Transfer the NFT from the seller to the buyer
        IERC721(listing.nftContract).safeTransferFrom(
            listing.seller,
            msg.sender,
            listing.tokenId
        );

        // Transfer the payment to the seller
        (bool success, ) = payable(listing.seller).call{value: msg.value}("");
        require(success, "Transfer to seller failed");

        emit NFTSold(
            msg.sender,
            listing.nftContract,
            listing.tokenId,
            listing.price
        );
    }

    // Cancel a listing
    function cancelListing(
        uint256 listingId
    ) external whenNotPaused onlySeller(listingId) {
        Listing storage listing = listings[listingId];
        require(!listing.sold, "NFT already sold");

        activeListings[listing.nftContract][listing.tokenId] = false;
        emit ListingCanceled(
            listing.seller,
            listing.nftContract,
            listing.tokenId
        );
    }

    // Update the price of a listing
    function updateListingPrice(
        uint256 listingId,
        uint256 newPrice
    ) external whenNotPaused onlySeller(listingId) {
        Listing storage listing = listings[listingId];
        require(!listing.sold, "NFT already sold");
        require(newPrice > 0, "Price must be greater than 0");

        listing.price = newPrice;
        emit ListingPriceUpdated(
            listing.seller,
            listing.nftContract,
            listing.tokenId,
            newPrice
        );
    }

    function getListings() external view returns (Listing[] memory) {
        return listings;
    }
}
