const { expect } = require("chai");
const { deployContract } = require("./utils/utils");

describe("TEST", function () {
  it("Should deploy the contracts and execute mint", async function () {
   
    const { contract: proxyAdmin } = await deployContract("ProxyAdmin");
    const { contract: implementationContract, owner, otherAccount } = await deployContract("Brickchain");
    const { contract: transparentUpgradeableProxy } = await deployContract("TransparentUpgradeableProxy", implementationContract.target, proxyAdmin.target, "0x");
    const addressSeller = otherAccount.address;
    const addressBuyer = owner.address;

    const { contract: erc20Contract } = await deployContract("ERC20PresetFixedSupply", "DefaultERC20", "DERC20", "100000000000000000000000000", addressBuyer);
    const erc20Address = erc20Contract.target

    const contract = await ethers.getContractAt("Brickchain", transparentUpgradeableProxy.target);

    const txInitialize = await contract.initialize();
    await txInitialize.wait();
    
    const txUpdateIssuer = await contract.updateIssuer(addressBuyer, true);
    await txUpdateIssuer.wait();
    
    const txApproveBuyer = await erc20Contract.approve(contract.target, "100000000000000000000000000")
    await txApproveBuyer.wait();

    const placeInfo = {
      name: 'Property name',
      price: '1000000000000000000',
      asset: erc20Address,
      tokenUri: 'TokenUriHash',
      totalAmount: '5',
      seller: addressSeller
    }

    const txCreatePlace = await contract.createProperty(placeInfo);
    await txCreatePlace.wait();

    //MINT BY TRANSFER
    const txMultipleMintByPlaceId = await contract.multipleMintByPropertyId(['1'], [addressBuyer]);
    await txMultipleMintByPlaceId.wait();

    expect(await contract.tokenIdToPropertyId(0)).to.equal('1');
  });
});  