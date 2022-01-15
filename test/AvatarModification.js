const { expect } = require("chai");

describe("AvatarModification contract", function () {
    let avatarModification;
    let avatarFactory;
    
    beforeEach(async function () {
        const avatarModificationFactory = await ethers.getContractFactory("ExposedAvatarModification");
        const avatarFactoryFactory = await ethers.getContractFactory("ExposedAvatarFactory");
        avatarFactory = await avatarFactoryFactory.deploy();
        avatarModification = await avatarModificationFactory.deploy();
    })

    it("modifyHp function", async function() {
        const [owner, addr1] = await ethers.getSigners();
        await avatarFactory.connect(addr1).createAvatarAndGetId.call();
        // await avatarFactory.createAvatarAndGetId();
        console.log(avatarFactory.avatars.length)
        console.log(avatarFactory.avatarToOwner.length)
        await avatarModification.modifyHp(0, 1);
        console.log(avatarFactory.avatars[0])
        expect(avatarFactory.avatars[0].hp).to.equal(11);
    });
})
