const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Marketplace Contract", function () {
  let marketplace, nft, owner, addr1, addr2;
  const deployTokenFixture = async () => {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const Marketplace = await ethers.getContractFactory("Marketplace");
    try {
      marketplace = await Marketplace.deploy();
    } catch (error) {
      console.error("Error deploying Marketplace:", error);
    }

    const MyNFT = await ethers.getContractFactory("MyNFT"); // We'll use a mock ERC721 contract
    try {
      nft = await MyNFT.deploy("MyNFT", "NFT");
    } catch (error) {
      console.error("Error deploying NFT:", error);
    }

    return { marketplace, nft, owner, addr1, addr2 };
  };

  // Cargar el fixture antes de cada prueba
  beforeEach(async function () {
    ({ marketplace, nft, owner, addr1, addr2 } = await loadFixture(
      deployTokenFixture
    ));
  });

  describe("ListNFT", function () {
    it("Should list an NFT correctly", async function () {
      // Mint an NFT to addr1
      await nft.mint(addr1.address);

      // Approve the Marketplace to transfer the NFT
      await nft.connect(addr1).approve(marketplace.target, 1);

      // List the NFT on the Marketplace
      await marketplace.connect(addr1).listNFT(nft.target, 1, 1000n);

      // Verify the listing was created correctly
      const listing = await marketplace.listings(0);
      expect(listing.seller).to.equal(addr1.address);
      expect(listing.nftContract).to.equal(nft.target);
      expect(listing.tokenId).to.equal(1);
      expect(listing.price).to.equal(1000n);
      expect(listing.sold).to.be.false;

      // Verify that the listing is active
      const isActive = await marketplace.isActiveListing(nft.target, 1);
      expect(isActive).to.be.true;
    });

    it("Should fail if the price is 0", async function () {
      await nft.mint(addr1.address);
      await nft.connect(addr1).approve(marketplace.target, 1);

      await expect(
        marketplace.connect(addr1).listNFT(nft.target, 1, 0)
      ).to.be.revertedWith("Price must be greater than 0");
    });

    it("Should fail if the NFT is not approved", async function () {
      await nft.mint(addr1.address);

      await expect(
        marketplace.connect(addr1).listNFT(nft.target, 1, 1000n)
      ).to.be.revertedWith("Marketplace is not approved to transfer this NFT");
    });
  });

  describe("BuyNFT", function () {
    it("Should buy an NFT correctly", async function () {
      // Mint an NFT to addr1
      await nft.mint(addr1.address);

      // Approve the marketplace to transfer the NFT
      await nft.connect(addr1).approve(marketplace.target, 1);

      // List the NFT on the marketplace with a price of 1000 wei
      await marketplace.connect(addr1).listNFT(nft.target, 1, 1000n); // 1000 wei = 0.001 ether

      // Buy the NFT
      await marketplace.connect(addr2).buyNFT(0, { value: 1000n }); // Asegúrate de usar el ID correcto de la lista

      // Verify the listing was removed (this can depend on how you implemented isActiveListing)
      const isActive = await marketplace.isActiveListing(nft.target, 1);
      expect(isActive).to.be.false;

      // Verify the NFT was transferred
      const owner = await nft.ownerOf(1);
      expect(owner).to.equal(addr2.address);
    });
  });

  describe("updateListingPrice", function () {
    it("Should update the price of a listing correctly", async function () {
      // Mint an NFT to addr1
      await nft.mint(addr1.address);

      // Approve the marketplace to transfer the NFT
      await nft.connect(addr1).approve(marketplace.target, 1);

      // List the NFT on the marketplace with a price of 1000 wei
      await marketplace.connect(addr1).listNFT(nft.target, 1, 1000n);

      // Update the price of the listing
      await marketplace.connect(addr1).updateListingPrice(0, 2000n);

      // Verify the price was updated
      const listing = await marketplace.listings(0);
      expect(listing.price).to.equal(2000n);
    });
  });
});
