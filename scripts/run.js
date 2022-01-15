const hre = require("hardhat");

const main = async () => {
    const nftContractFactory = await hre.ethers.getContractFactory('AvatarOwnership');
    const nftContract = await nftContractFactory.deploy(1000);
    await nftContract.deployed();
    console.log("Contract deployed to:", nftContract.address);
  
    // Call the function.
    // let txn = await nftContract.makeAnEpicNFT()
    // Wait for it to be mined.
    // await txn.wait()
  
    // Mint another NFT for fun.
    // txn = await nftContract.makeAnEpicNFT()
    // Wait for it to be mined.
    // await txn.wait()
  
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();