const { expect } = require("chai");

describe("AvatarFactory contract", function () {
    let avatarFactory;

    beforeEach(async function() {
        const avatarFactoryFactory = await ethers.getContractFactory("ExposedAvatarFactory");
        avatarFactory = await avatarFactoryFactory.deploy();
    })

    it("Check _createAvatarAndGetId", async function () {
        const [owner, addr1] = await ethers.getSigners();
        let num = await avatarFactory.connect(addr1).createAvatarAndGetId()
        console.log(num);
        expect(await avatarFactory.createAvatarAndGetId()).to.equal(0);
    });
})