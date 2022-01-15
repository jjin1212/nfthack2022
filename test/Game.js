const { expect } = require("chai");
const { ethers } = require("hardhat")


describe("Game contract", function () {

    let game;
    let token;

    beforeEach(async function () {
        const gameFactory = await ethers.getContractFactory("Game");
        const tokenFactory = await ethers.getContractFactory("TokenContract")
        token = await tokenFactory.deploy();
        game = await gameFactory.deploy(token.address);
    });

    it("stake function", async function() {
        const [owner, addr1] = await ethers.getSigners();
        await token.connect(addr1).mint(5);
        await token.approve(addr1.address, "4");

        const allowed = await token.allowance(owner.address, addr1.address)
        const sum = await token.balanceOf(addr1.address)

        expect(ethers.utils.formatEther(allowed)).to.equal('0.000000000000000004');

        await game.connect(addr1).stake(4)

        expect(await token.balanceOf(addr1.address)).to.equal(1);
        expect(await game.stakedTokens(addr1.address)).to.equal(4);
    });
});