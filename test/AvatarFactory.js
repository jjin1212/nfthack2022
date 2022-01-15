const { expect } = require("chai");
// const { ethers } = require("ethers");

describe("AvatarFactory contract", function () {
    let avatarFactory;

    beforeEach(async function() {
        const avatarFactoryFactory = await ethers.getContractFactory("AvatarFactory");
        avatarFactory = await avatarFactoryFactory.deploy();
    })

    it("Check _createAvatarAndGetId", async function () {
        await avatarFactory._createAvatarAndGetId();
    });
})