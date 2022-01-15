const { expect } = require("chai");
const { ethers } = require("hardhat")


describe("Game contract", function () {

    let game;
    let token;
    let equipment;
    let avatar;
    let randGenerator;

    beforeEach(async function () {
        const gameFactory = await ethers.getContractFactory("Game");
        const tokenFactory = await ethers.getContractFactory("TokenContract")
        const equipmentFactory = await ethers.getContractFactory("EquipmentContract")
        const avatarFactory = await ethers.getContractFactory("AvatarTokens")
        const randGeneratorFactory = await ethers.getContractFactory("RandomNumberConsumer")
        attackBoosts = [2, 6, 10];
        hpBoosts = [20, 30, 40];
        token = await tokenFactory.deploy();
        equipment = await equipmentFactory.deploy(attackBoosts, hpBoosts);
        avatar = await avatarFactory.deploy();
        randGenerator = await randGeneratorFactory.deploy();
        game = await gameFactory.deploy(
            token.address, 
            equipment.address, 
            avatar.address,
            randGenerator.address
        );
    });

    it("stake function", async function() {
        const [owner, addr1] = await ethers.getSigners();
        await token.connect(addr1).mint(5);
        await token.connect(addr1).approve(game.address, "4");
        const allowed = await token.allowance(addr1.address, game.address)
        expect(ethers.utils.formatEther(allowed)).to.equal('0.000000000000000004');
        await game.connect(addr1).stake(4)
        expect(await token.balanceOf(addr1.address)).to.equal(1);
        expect(await game.stakedTokens(addr1.address)).to.equal(4);
    });
});