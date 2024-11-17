# brickchain-sc
This repository contains the source code of a **Smart Contract (SC)** developed in Solidity. This contract is designed for token management, purchase and resale of tokens for the brickchain platform.

#### Main characteristics:
- Issuance and transfer of ERC-721 tokens.
- Secure storage of data in blockchain.

#### Requirements
- Blockchain: RootStock
- Compiler version Solidity ^0.8.0.
- Dependencies: Hardhat.

#### Installation and Use:
1. Clone this repository:  
   ```bash
   git clone https://github.com/Taniabarron/brickchain-sc
   ```
2. Install the dependencies:   
   ```bash
   npm install
   ```
3. Compiles the contract:   
   ```bash
   npx hardhat compile
   ```
4. Deploy the contract: 
   ```bash
   npx hardhat run scripts/deploy.js --network <network>
   ```

#### Setup Enviorments 

1. PRIVATE_KEY_0 is the address owner of the contract and the same that will be used to make the system transactionsFor now it will not be possible to use the model due to an error in the library installation.

   ```bash
   npx hardhat vars set PRIVATE_KEY_0
   npx hardhat vars set PRIVATE_KEY_1
   ```

#### Check Setup Enviorments 

   ```bash
   npx hardhat vars get PRIVATE_KEY_1
   npx hardhat vars get PRIVATE_KEY_0
   ```

#### Test Commands in the Hardat Fork (local)

   ```bash  
   npx hardhat test .\test\deploy.js --network hardhat
   npx hardhat test .\test\test_contracts.js --network hardhat
   ```

#### Command Deploy Testnet

   ```bash  
   npx hardhat test .\test\deploy.js --network rootstocktest
   ```

#### Command Deploy Mainnet
   ```bash  
   npx hardhat test .\test\deploy.js --network rootstock
   ```

#### Testing
   Run the tests with the following command:  
   ```bash
   npx hardhat test
   ```
