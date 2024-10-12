import { ethers } from 'ethers';
import contractABI from '../../../artifacts/contracts/Marketplace.sol/Marketplace.json'; // Make sure this is the correct path to your ABI
import { connectWallet } from './connectWallet'; // Updated import

const contractAddress = "0xbafFA90E48E6998AE43243c9cE19c3c0287e06E0"; // Replace with your deployed contract address

export const listNFT = async (nftContract, tokenId, price, connected, setConnected, setWalletAddress) => {
  try {
    // Use the connectWallet function to manage wallet connection
    await connectWallet(connected, setConnected, setWalletAddress);

    if (!connected) {
      console.error('Wallet not connected.');
      return;
    }

    // Obtain the signer after ensuring the wallet is connected
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log('Signer:', signer);

    // Create the marketplace contract instance
    const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

    // Convert price to Wei using ethers.utils.parseEther
    const weiPrice = ethers.utils.parseEther(price);

    // Call contract method to list the NFT with nftContract as a parameter
    const transaction = await contract.listNFT(nftContract, tokenId, weiPrice);
    await transaction.wait(); // Wait for the transaction to be mined
    console.log('Transaction hash:', transaction.hash);

    console.log('NFT listed successfully');
  } catch (error) {
    console.error('Error listing NFT:', error);
  }
};
