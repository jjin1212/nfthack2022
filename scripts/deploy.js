async function main() {
    // We get the contract to deploy
    const gameFactory = await ethers.getContractFactory("Game");
    const tokenFactory = await ethers.getContractFactory("TokenContract")
    const equipmentFactory = await ethers.getContractFactory("EquipmentContract")
    const avatarFactory = await ethers.getContractFactory("AvatarOwnership")
    const randGeneratorFactory = await ethers.getContractFactory("RandomNumberConsumer")
    const chainlinkClientFactory = await ethers.getContractFactory("APIConsumer")
    token = await tokenFactory.deploy();
    await token.deployed()
    equipment = await equipmentFactory.deploy();
    await equipment.deployed()
    avatar = await avatarFactory.deploy(1000);
    await avatar.deployed()
    randGenerator = await randGeneratorFactory.deploy();
    await randGenerator.deployed()
    chainlinkClient = await chainlinkClientFactory.deploy();
    await chainlinkClient.deployed
    game = await gameFactory.deploy(
        token.address,
        equipment.address,
        avatar.address,
        randGenerator.address,
        chainlinkClient.address
    );
    await game.deployed()

    console.log("Token deployed to:", token.address);
    console.log("Equipment deployed to:", equipment.address);
    console.log("Avatar deployed to:", avatar.address);
    console.log("Rand generator deployed to:", randGenerator.address);
    console.log("Chainlink client deployed to:", chainlinkClient.address);
    console.log("Game deployed to:", game.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  