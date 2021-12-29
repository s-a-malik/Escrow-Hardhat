# Decentralized Escrow Application

This is an Escrow Dapp built with [Hardhat](https://hardhat.org/).

## Extensions to the initial Fork from Chainshot Bootcamp

From the initial repo clone, I have added the following features:

- Works on Rinkeby testnet and Verified the contract source code. 
- added a cancel functionality to the contract to return funds to depositor if arbiter wants to (with hardhat tests). This self destructs the contract. The arbiter still has to pay the gas though!
- Can pull the status of any deployed contract given the address (solves the persistancy issue).
- Converted wei to ETH for more user friendly experience.
- Added useful messages giving the address of the contract in the UI when deployed. Also gives error message for trying to approve without the correct arbiter.

See Example Contracts on Rinkeby:

- Open contract: https://rinkeby.etherscan.io/address/0xD88d312e7608A57380556664542C8bEA603e1e1d
- Approved: https://rinkeby.etherscan.io/address/0x047b7Dc05482Ec3CBfb9fF45EEa572aAF5A12cdd 
- Cancelled: https://rinkeby.etherscan.io/address/0x7628D165F64C5e46BF6bED719b9Ecc988e43F9aC


## Project Layout

There are three top-level folders:

1. `/app` - contains the front-end application
2. `/contracts` - contains the solidity contract
3. `/tests` - contains tests for the solidity contract

## Setup

Install dependencies in the top-level directory with `npm install`.

After you have installed hardhat locally, you can use commands to test and compile the contracts, among other things. To learn more about these commands run `npx hardhat help`.

Compile the contracts using `npx hardhat compile`. The artifacts will be placed in the `/app` folder, which will make it available to the front-end. This path configuration can be found in the `hardhat.config.js` file.

## Front-End

To run the front-end application move into the `app` folder and run `npx parcel index.html`.

You can learn more about Parcel [here](https://parceljs.org/).
