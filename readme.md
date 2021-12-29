# Decentralized Escrow Application

This is an Escrow Dapp built with [Hardhat](https://hardhat.org/).

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

## Extensions to the initial Fork from Chainshot Bootcamp

From the initial repo clone, I have added the following features:

- Works on Rinkeby testnet (see example deployed contract @ ...)
- added revert functionality to the contract to return funds to depositor if arbiter wants to (with hardhat tests).
- Can pull the status of any deployed contract given the address (solves the persistancy issue).
- Converted wei to ETH for more user friendly experience.
- Added useful messages giving the address of the contract in the UI when deployed. Also gives error message for trying to approve without the correct arbiter.
