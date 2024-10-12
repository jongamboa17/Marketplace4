const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const MarketplaceModule = buildModule("MarketplaceModule", (m) => {
  const item = m.contract("Marketplace");

  return { item };
});

module.exports = MarketplaceModule;
