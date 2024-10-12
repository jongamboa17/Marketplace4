const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const MyNFTModule = buildModule("MyNFTModule", (m) => {
  const nft = m.contract("MyNFT", ["MyNFT", "NFT"]);

  return { nft };
});

module.exports = MyNFTModule;
