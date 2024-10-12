import { ethers } from "ethers";

export async function connectWallet(connected, setConnected, setWalletAddress) {
  if (!connected) {
    // Connect the wallet using ethers.js
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const _walletAddress = await signer.getAddress();
    setConnected(true);
    setWalletAddress(_walletAddress);
  } else {
    // Disconnect the wallet
    setConnected(false);
    setWalletAddress("");
  }
}