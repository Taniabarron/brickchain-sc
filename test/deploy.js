const { deployContract } = require("./utils/utils");

describe("Deploy", function () {
  this.timeout(120000);
  it("Should deploy the contracts", async function () {
    
    const { contract: proxyAdmin } = await deployContract("ProxyAdmin");
    const { contract: implementation, owner } = await deployContract("Brickchain");
    const { contract: transparentUpgradeableProxy } = await deployContract("TransparentUpgradeableProxy", implementation.target, proxyAdmin.target, "0x");
    
    const contract = await ethers.getContractAt("Brickchain", transparentUpgradeableProxy.target);
    
    const txInitialize = await contract.initialize();
    await txInitialize.wait();

    const txUpdateIssuer = await contract.updateIssuer(owner.address, true);
    await txUpdateIssuer.wait();

    console.log('Proxy Admin: ', proxyAdmin.target)
    console.log('Implementation: ', implementation.target)
    console.log('Transparent Upgradeable Proxy: ', transparentUpgradeableProxy.target)
    console.log('Owner Address: ', owner.address)
  });
  
});