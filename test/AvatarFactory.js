const { expect } = require("chai");

describe("AvatarFactory contract", function () {
    let avatarFactory;

    beforeEach(async function() {
        const avatarFactoryFactory = await ethers.getContractFactory("ExposedAvatarFactory");
        avatarFactory = await avatarFactoryFactory.deploy();
    })

    it("Check _createAvatarAndGetId", async function () {
        expect(await avatarFactory._createAvatarAndGetId()).to.equal(0);
    });
})