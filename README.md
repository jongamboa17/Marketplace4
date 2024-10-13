## Project Overview 🚀

This project features a decentralized marketplace for NFTs, built using Solidity smart contracts. The project leverages Hardhat for development and testing, Ethers.js for blockchain interaction, and a front-end built with Next.js and React to provide a seamless user experience.


## Project Contracts 📜

### Marketplace.sol 🏪

This smart contract in Solidity defines a marketplace for NFTs (non-fungible tokens), where users can list, buy, and manage the sale of NFTs. Below are its main functions and features:

#### Contract Structure

- **Properties:**
  - **Listing:** A structure containing information about each listed NFT, including the seller, NFT contract, token ID, price, and sale status.
  - **listings:** An array storing all the NFT listings.
  - **ActiveListings:** A mapping tracking whether an NFT is currently listed.

- **Functions:**
  - **listNFT:** Allows users to list their NFT by providing the NFT contract, token ID, and price.
  - **buyNFT:** Enables users to purchase a listed NFT, ensuring the price matches and the NFT is available.
  - **cancelListing:** Allows sellers to cancel their NFT listing before it is sold.
  - **updateListingPrice:** Enables sellers to update the price of their listed NFT, provided it hasn't been sold.

#### Main Functions

- **Pause and Resume:** Only the contract owner can pause or resume the marketplace, which helps stop all operations in case of an issue.
- **List an NFT:** Users can list their NFT by providing the NFT contract, token ID, and price. Several checks are performed:
  - The price must be greater than zero.
  - The user must be the owner of the NFT.
  - The NFT contract must be approved for the marketplace to transfer it.
- **Buy an NFT:** Allows users to buy a listed NFT, provided the sent price matches the listed price. The contract checks that the NFT has not been sold and that the marketplace has approval to transfer it. Transfers the NFT to the buyer and sends the payment to the seller.
- **Cancel a Listing:** A seller can cancel their listing before the sale is completed, as long as the NFT has not been sold.
- **Update Price:** Allows sellers to modify the price of their listing, provided the NFT has not been sold.
- **Get Listings:** Allows users to view all available NFT listings.

#### Events 📢

The contract emits several events to log important actions, such as when an NFT is listed, sold, canceled, or its price is updated. These events are useful for user interfaces and other applications to react to changes in the contract's state.

### MyNFT.sol 🎨

This smart contract in Solidity defines a non-fungible token (NFT) called MyNFT, which allows users to create and manage NFTs. Below are its main functionalities and features:

#### Contract Structure

- **Inheritance:** The contract inherits from ERC721, the standard for NFTs on Ethereum, provided by the OpenZeppelin library. This means the contract already includes many essential functionalities for an NFT.
- **nextTokenId:** A variable tracking the next token ID to be used when creating a new NFT. It starts at 1, meaning the first NFT created will have ID 1.

#### Main Functions

- **Constructor:** Initializes the ERC721 contract with a name and symbol for the NFT and sets `nextTokenId` to 1.
- **Mint Function:** Allows anyone to create (or "mint") a new NFT for a specific address. It uses the `_mint` function to assign the new NFT to the recipient with the current token ID and increments `nextTokenId` to ensure the next NFT has a unique ID.
- **approveMarketplace Function:** Allows the owner of an NFT to approve a marketplace contract to manage all their NFTs using `setApprovalForAll`.

#### Summary of Functionalities

- **Minting:** Any user can create new NFTs by calling the mint function, specifying who should receive the NFT.
- **Marketplace Approval:** Allows NFT owners to approve a marketplace to manage their tokens, facilitating the sale or exchange of NFTs in a marketplace.

## 👷 Dev Stack

### Back End Stack 🛠️

- **Hardhat:** Hardhat is a development environment for Ethereum that allows developers to build, test, and deploy smart contracts and decentralized applications (dApps). It is a popular tool among blockchain developers due to its robust features and ease of use.

- **Ethers.js:** Ethers.js is a powerful JavaScript library designed to interact with the Ethereum blockchain. It provides a comprehensive set of tools for developers to build decentralized applications (dApps) and manage Ethereum-based assets.

### Front End Stack 🌐

- **Next.js:** A popular React framework that enables developers to build server-side rendered and statically generated web applications.

- **React:** An open-source JavaScript library used for building user interfaces, especially for single-page applications (SPAs). Developed by Facebook, it has become one of the most popular tools for front-end development.

#### Main Features 🌟

- **Connect to Your Wallet:** Users can securely connect their cryptocurrency wallets to the platform, enabling them to interact with the marketplace and manage their NFTs.
- **List an NFT:** Users can list their NFTs for sale on the marketplace by specifying the NFT contract, token ID, and desired price.
- **Buy an NFT:** Users can purchase NFTs listed on the marketplace, ensuring a seamless transaction process that transfers the NFT to the buyer and the payment to the seller.

## Contract Links 🔗

- **Marketplace:** [View on Etherscan](https://sepolia.etherscan.io/address/0x32E7E9678407aA2430796E93a1A27D7D251FEE62)
- **NFT:** [View on Etherscan](https://sepolia.etherscan.io/address/0x830f55d8bc26c2d36E97f89c5D5484A5C34D0D08)

## Team Members 👥

- **María Liseth González Flores** - [GitHub Profile](https://github.com/Mgonzalez06/Marketplace4)
- **Jonathan Gamboa** - [GitHub Profile](https://github.com/jongamboa17/Marketplace4)
- **Lindsay Dayana Badilla Rodriguez** - [GitHub Profile](https://github.com/LinSys16/Marketplace4)
