async function main() {
    // Obtén el primer signer (cuenta principal)
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with account:", deployer.address);
  
    try {
      // Obtén el balance de la cuenta
      const balance = await ethers.provider.getBalance(deployer.address);
  
      // Verificar si balance es válido antes de formatearlo
      if (balance !== undefined) {
        console.log("Account balance:", ethers.formatEther(balance), "TRBTC");
      } else {
        console.error("Error: Balance is undefined.");
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  