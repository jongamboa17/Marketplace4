# NFTs Marketplace 

👷 Hardhat

It is a development environment for Ethereum that allows developers to build, test, and deploy smart contracts and decentralized applications (dApps). It is a popular tool among blockchain developers due to its robust features and ease of use.

Contracts in This Project

There are two contracts in this project that interact with each other.

Marketplace.sol

✍️ This smart contract in Solidity defines a marketplace for NFTs (non-fungible tokens), where users can list, buy, and manage the sale of NFTs. Here are its main functions and features:

Contract Structure:

Properties:

Listing: A structure that contains information about each listed NFT, including the seller, NFT contract, token ID, price, and whether it has been sold.

listings: An array that stores all the NFT listings.

ActiveListings: A mapping that tracks whether an NFT is currently listed.

Main Functions

Pause and Resume: Only the owner of the contract can pause or resume the marketplace, which helps stop all operations in case of an issue.

List an NFT:

A user can list their NFT by providing the NFT contract, token ID, and price.

Several checks are performed: the price must be greater than zero, the user must be the owner of the NFT, and the NFT contract must be approved for the marketplace to transfer it.

Buy an NFT:

Allows users to buy a listed NFT, provided the sent price matches the listed price.
The contract checks that the NFT has not yet been sold and that the marketplace has approval to transfer it.
Transfers the NFT to the buyer and sends the payment to the seller.

Cancel a Listing:

A seller can cancel their listing before the sale is completed, as long as the NFT has not been sold.

Update Price:

Allows sellers to modify the price of their listing, provided the NFT has not been sold.

Get Listings:

Allows users to view all available NFT listings.

Events

The contract emits several events to log important actions, such as when an NFT is listed, sold, canceled, or its price is updated. These events are useful for user interfaces and other applications to react to changes in the contract's state.

MyNFT.sol

✍️This smart contract in Solidity defines a non-fungible token (NFT) called MyNFT, which allows users to create and manage NFTs. Here are its main functionalities and features:

Contract Structure:

Inheritance: The contract inherits from ERC721, which is the standard for NFTs on Ethereum, provided by the OpenZeppelin library. This means the contract already includes many essential functionalities for an NFT.

nextTokenId: A variable that tracks the next token ID to be used when creating a new NFT. It starts at 1, meaning the first NFT created will have ID 1.

Main Functions:

Constructor:

The constructor runs when the contract is deployed. It initializes the ERC721 contract with a name and symbol for the NFT. It also sets nextTokenId to 1.
Mint Function:

This function allows anyone (any network user) to create (or "mint") a new NFT for a specific address.

It uses the _mint function to assign the new NFT to the recipient with the current token ID.

After minting the NFT, it increments nextTokenId to ensure the next NFT has a unique ID.

approveMarketplace Function:

This function allows the owner of an NFT to approve a marketplace contract to manage all their NFTs.

It uses setApprovalForAll to grant the marketplace contract permission to transfer the owner's NFTs.

Summary of Functionalities

Minting: Any user can create new NFTs by calling the mint function, as long as they specify who should receive the NFT.

Marketplace Approval: Allows NFT owners to approve a marketplace to manage their tokens, which is useful for facilitating the sale or exchange of NFTs in a marketplace.

Front End:

The front end refers to the part of an application or website that users interact with directly.

Technologies Used:

JavaScript.

Interaction with the Back End

React 

React is an open-source JavaScript library used for building user interfaces, especially for single-page applications (SPAs). It was developed by Facebook and has become one of the most popular tools for front-end development. Here are its main features:

Components:

React is based on the concept of components, which are reusable pieces of code that represent parts of the user interface. Each component can have its own state and logic, making it easier to create and maintain complex applications.

Link de los contratos validados 

Marketplace: https://sepolia.etherscan.io/address/0x32E7E9678407aA2430796E93a1A27D7D251FEE62 

NFT: https://sepolia.etherscan.io/address/0x830f55d8bc26c2d36E97f89c5D5484A5C34D0D08 

Nombres de los miembros del equipo con el link a cada uno de los perfiles de Github.

María Liseth González Flores https://github.com/Mgonzalez06/Marketplace4

Jonathan Gamboa https://github.com/jongamboa17/Marketplace4

Lindsay Dayana Badilla Rodriguez https://github.com/LinSys16/Marketplace4

