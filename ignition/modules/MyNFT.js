const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const MyNFTModule2 = buildModule("MyNFTModule2", (m) => {
  const nft = m.contract("MyNFT", ["MyNFT", "NFT"]);

  // Get the deployer's address
  const deployerAddress = "0x7354e05a394c4d98b0693ac63be40874c0e7c5d1";
  console.log("Deployer address:", deployerAddress);
  m.call(nft, "mint", [deployerAddress]);

  // Mint a new NFT to the deployer's address during deployment
  //m.call(nft, "mint", [deployerAddress]);

  return { nft };
});

module.exports = MyNFTModule2;
