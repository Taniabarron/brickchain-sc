const { ethers } = require("hardhat"); 

const deployContract = async (contractName, ...args) => {
  const [owner, otherAccount] = await ethers.getSigners();

  const Contract = await ethers.getContractFactory(contractName);
  const contract = await Contract.deploy(...args);
  await contract.waitForDeployment();
  
  return { contract, owner, otherAccount };
}

module.exports = {
  deployContract
}