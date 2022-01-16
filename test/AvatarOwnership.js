const { expect } = require("chai");

describe.only("AvatarOwnership contract", function () {
    let avatarOwnership;
    
    beforeEach(async function () {
        const avatarOwnershipFactory = await ethers.getContractFactory("AvatarOwnership");
        avatarOwnership = await avatarOwnershipFactory.deploy(5);
    })

    it("Check Constructor", async function () {
        expect(await avatarOwnership.maxSupply()).to.equal(5);
        console.log(await avatarOwnership.avatars.length)
        // expect(await avatarOwnership.avatars().length).to.equal(5)
    });
    it("mint function", async function() {
        const [owner, addr1] = await ethers.getSigners();
        await avatarOwnership.connect(addr1).mint();
        expect(await avatarOwnership.balanceOf(addr1.address)).to.equal(1);
    });
    it("getAvatarStats", async function() {
        await avatarOwnership.mint();
        console.log(avatarOwnership.avatars[0]);
        console.log(avatarOwnership.avatars.length);
        // expect(await avatarOwnership.getAvatarStats(0)).to.equal(0,10,10,0);
    });
})
