import { ethers } from 'ethers';

export async function estimateGasFeeAndCheckBalance(nftContract, tokenId, price) {
  // Set up your provider and contract instance
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(nftContract, contractABI, signer);

  // Estimate gas
  const gasEstimate = await contract.estimateGas.listNFT(tokenId, price);
  const gasPrice = await provider.getGasPrice();

  // Calculate total gas fee
  const totalGasFee = gasEstimate.mul(gasPrice);

  // Get the address of the connected wallet
  const address = await signer.getAddress();

  // Get the balance of the wallet
  const balance = await provider.getBalance(address);

  // Convert the balance from Wei to Ether
  const balanceInEther = ethers.utils.formatEther(balance);

  // Convert total gas fee from Wei to Ether
  const totalGasFeeInEther = ethers.utils.formatEther(totalGasFee);

  return {
    totalGasFeeInEther,
    balanceInEther
  };
}
