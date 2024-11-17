const { removeConsoleLog } = require('hardhat-preprocessor')
const { vars } = require("hardhat/config");
require("@nomicfoundation/hardhat-toolbox");

const PRIVATE_KEY_0 = "";
const PRIVATE_KEY_1 = "";
const MAINNET_RPC = "https://public-node.rsk.co";

/** @type import("hardhat/config").HardhatUserConfig */
module.exports = {
  networks: {
    rootstock: {
      url: MAINNET_RPC,
      chainId: 30,
      accounts: [PRIVATE_KEY_0, PRIVATE_KEY_1]
    },
    rootstocktest: {
      url: "https://public-node.testnet.rsk.co",
      chainId: 31,
      accounts: [PRIVATE_KEY_0, PRIVATE_KEY_1]
    },
    rootstocktestrpc: {
      url: "https://rpc.testnet.rootstock.io/ypZdAcXL0sFL29k8cajLYcdJfufr8U-T",
      chainId: 31,
      gasPrice: 60000000,
      accounts: [PRIVATE_KEY_0, PRIVATE_KEY_1]
    },
    hardhat: {
      forking: {
        url: MAINNET_RPC,
      },
      chainId: 4002,
      accounts: [
        {
          privateKey: PRIVATE_KEY_0,
          balance: '1000000000000000000000000000'
        },
        {
          privateKey: PRIVATE_KEY_1,
          balance: '1000000000000000000000000000'
        }
      ]
    },
  },
  mocha: {
    timeout: 60000, 
  },
  solidity: {
    compilers: [
      {
        version: "0.8.13",
        settings: {
          optimizer: {
            enabled: true
          }
        }
      }
    ]
  },
  preprocess: {
    eachLine: removeConsoleLog(_ => false)
  },
};
