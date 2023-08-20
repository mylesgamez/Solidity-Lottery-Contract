# Solidity-Lottery-Contract
This project is a decentralized lottery application based on the Ethereum blockchain. It's built using Solidity and integrates with Chainlink VRF (Verifiable Random Function) to securely generate random numbers for picking lottery winners.

## Dependencies
Make sure you have the following dependencies installed on your machine:
- Node.js (>= v12)
- npm

## Smart Contract Details
- Lottery.sol is the main smart contract for the lottery application. It has the following functionalities:
- enter(): Allows a user to enter the lottery by sending at least 0.01 ETH.
- getRandomNumber(): Requests a random number from Chainlink VRF.
- fulfillRandomness(bytes32 requestId, uint256 randomness): Callback function for Chainlink VRF that sets the random number and picks a winner.
- pickWinner(): Picks a winner based on the random number and transfers the entire contract balance to the winner.
- getPlayers(): Returns a list of all players in the current lottery.
 -restricted: A modifier to restrict certain functions to the manager only.

## Getting Started
Clone the repository
```
git clone https://github.com/yourusername/ethereum-lottery.git
cd ethereum-lottery
```

Install dependencies
```
npm install
```

Compile smart contracts
```
truffle compile
```

Run tests
```
truffle test
```

## Testing
lottery.test.js is the test script for the Lottery.sol contract. It includes test cases to verify the functionality of the contract, such as entering the lottery, ensuring the minimum amount of ETH to enter, and verifying that only the manager can pick a winner.

## Deployment
The truffle-config.js file provides configurations for deploying the smart contract to various networks. You can configure it with your own Infura Project ID and mnemonic for deploying to public networks like Goerli, Rinkeby, or Mainnet.

## License
MIT
