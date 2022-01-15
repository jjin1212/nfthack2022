const { expect } = require("chai");

describe("AvatarOwnership contract", function () {
    let avatarOwnership;
    
    beforeEach(async function () {
        const avatarOwnershipFactory = await ethers.getContractFactory("AvatarOwnership");
        avatarOwnership = await avatarOwnershipFactory.deploy(5);
    })

    it("Check Constructor", async function () {
        expect(await avatarOwnership.maxSupply()).to.equal(5);
    });
    it("mint function", async function() {
        const [owner, addr1] = await ethers.getSigners();
        await avatarOwnership.connect(addr1).mint();
        expect(await avatarOwnership.balanceOf(addr1.address)).to.equal(1);
    });
})