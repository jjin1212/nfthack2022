const { expect } = require("chai");

describe("AvatarModification contract", function () {
    let avatarOwnership;
    let avatarModification;
    let avatarFactory;
    
    beforeEach(async function () {
        const avatarModificationFactory = await ethers.getContractFactory("AvatarOwnership");
        const avatarOwnershipFactory = await ethers.getContractFactory("AvatarOwnership");
        const avatarFactoryFactory = await ethers.getContractFactory("AvatarFactory");
        avatarFactory = await avatarFactoryFactory.deploy();
        avatarOwnership = await avatarOwnershipFactory.deploy(5);
        avatarModification = await avatarModificationFactory.deploy();
        const [owner, addr1] = await ethers.getSigners();
        await avatarOwnership.connect(addr1).mint();
    })

    it("modifyHp function", async function() {
        await avatarModification.modifyHp(0, 1);
        expect(avatarOwnership.avatars[0].hp).to.equal(11);
    });
})
