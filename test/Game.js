const { expect } = require("chai");
const { ethers } = require("hardhat")
const { waffle } = require("hardhat")
const { deployMockContract } = waffle


describe.only("Game contract", function () {

    let game;
    let token;
    let equipment;
    let avatar;
    let randGenerator;

    beforeEach(async function () {
        const gameFactory = await ethers.getContractFactory("Game");
        const tokenFactory = await ethers.getContractFactory("TokenContract")
        const equipmentFactory = await ethers.getContractFactory("EquipmentContract")
        const avatarFactory = await ethers.getContractFactory("AvatarOwnership")
        const randGeneratorFactory = await ethers.getContractFactory("RandomNumberConsumer")
        attackBoosts = [2, 6, 10];
        hpBoosts = [20, 30, 40];
        token = await tokenFactory.deploy();
        equipment = await equipmentFactory.deploy(attackBoosts, hpBoosts);
        avatar = await avatarFactory.deploy(1000);
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
        await game.connect(addr1).stake(4)
        expect(await token.balanceOf(addr1.address)).to.equal(1);
        expect(await game.stakedTokens(addr1.address)).to.equal(4);
    });

    it("stake then unstake function", async function() {
        const [owner, addr1] = await ethers.getSigners();
        await token.connect(addr1).mint(5);
        await token.connect(addr1).approve(game.address, "4");
        await game.connect(addr1).stake(4)
        expect(await token.balanceOf(addr1.address)).to.equal(1);
        expect(await game.stakedTokens(addr1.address)).to.equal(4);

        await game.connect(addr1).unstake(3)
        expect(await token.balanceOf(addr1.address)).to.equal(4);
        expect(await game.stakedTokens(addr1.address)).to.equal(1);
    });

    it("battle results", async function() {
        const [owner] = await ethers.getSigners();
        // console.log(randGenerator)
        // rand = await deployMockContract(owner, randGenerator.abi)
        await token.mint(5);
        await token.approve(game.address, "4");
        await game.stake(4)
        expect(await token.balanceOf(owner.address)).to.equal(1);

        await game.battleResults(0)
        expect(await token.balanceOf(owner.address)).to.equal(9);
    })
});