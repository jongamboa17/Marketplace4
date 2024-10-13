import { ethers } from "ethers";
import marketplaceABI from "../../../artifacts/contracts/Marketplace.sol/Marketplace.json"; // Make sure this is the correct path to your ABI
import nftABI from "../../../artifacts/contracts/MyNFT.sol/MyNFT.json"; // Make sure this is the correct path to your ABI
import { connectWallet } from "./connectWallet"; // Updated import

const marketplaceAddress = "0x32E7E9678407aA2430796E93a1A27D7D251FEE62"; // Replace with your deployed contract address

export const listNFT = async (
  nftContract,
  tokenId,
  price,
  connected,
  setConnected,
  setWalletAddress
) => {
  try {
    // Use the connectWallet function to manage wallet connection
    await connectWallet(connected, setConnected, setWalletAddress);

    if (!connected) {
      console.error("Wallet not connected.");
      return;
    }

    // Obtain the signer after ensuring the wallet is connected
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log("Signer:", signer);

    // Create the marketplace contract instance
    const contract = new ethers.Contract(
      marketplaceAddress,
      marketplaceABI.abi,
      signer
    );

    // Convert price to Wei using ethers.utils.parseEther
    const weiPrice = price;

    // Call contract method to list the NFT with nftContract as a parameter
    const transaction = await contract.listNFT(nftContract, tokenId, weiPrice);
    await transaction.wait(); // Wait for the transaction to be mined
    console.log("Transaction hash:", transaction.hash);

    console.log("NFT listed successfully");
  } catch (error) {
    console.error("Error listing NFT:", error);
  }
};

export const approveNFT = async (
  myNFTAddress,
  tokenId,
  connected,
  setConnected,
  setWalletAddress
) => {
  try {
    // Use the connectWallet function to manage wallet connection
    await connectWallet(connected, setConnected, setWalletAddress);

    if (!connected) {
      console.error("Wallet not connected.");
      return;
    }

    // Obtain the signer after ensuring the wallet is connected
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log("Signer:", signer);

    // Create the nft contract instance
    const contract = new ethers.Contract(myNFTAddress, nftABI.abi, signer);

    await contract.mint(signer.address); // Mint an NFT

    // Call contract method to approve the NFT with nftContract as a parameter
    const transaction = await contract
      .connect(signer)
      .approve(marketplaceAddress, tokenId);
    await transaction.wait(); // Wait for the transaction to be mined
    console.log("Transaction hash:", transaction.hash);

    console.log("NFT approved successfully");
  } catch (error) {
    console.error("Error approving NFT:", error);
  }
};

export const getActiveListings = async (
  connected,
  setConnected,
  setWalletAddress,
  setNfts
) => {
  await connectWallet(connected, setConnected, setWalletAddress);

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      marketplaceAddress,
      marketplaceABI.abi,
      signer
    );

    const listings = await contract.getListings();
    console.log("Listings:", listings);
    setNfts(listings.filter((listing) => !listing.sold));
  } catch (error) {
    console.error("Error fetching listings:", error);
  }
};

export const buyNFT = async (
  nftContract,
  tokenId,
  price,
  connected,
  setConnected,
  setWalletAddress
) => {
  try {
    await connectWallet(connected, setConnected, setWalletAddress);

    if (!connected) {
      console.error("Wallet not connected.");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log("Signer:", signer);

    const contract = new ethers.Contract(
      marketplaceAddress,
      marketplaceABI.abi,
      signer
    );

    const weiPrice = price;

    const transaction = await contract.buyNFT(tokenId, {
      value: weiPrice,
    });
    await transaction.wait();
    console.log("Transaction hash:", transaction.hash);

    console.log("NFT purchased successfully");
  } catch (error) {
    console.error("Error buying NFT:", error);
  }
};
