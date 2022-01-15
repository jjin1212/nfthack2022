const { expect } = require("chai");

describe("Token contract", function () {

    let token;

    beforeEach(async function () {
        const tokenFactory = await ethers.getContractFactory("TokenContract");
        token = await tokenFactory.deploy();
    })

    it("mint function", async function() {
        const [owner, addr1] = await ethers.getSigners();
        await token.connect(addr1).mint(1);
        expect(await token.balanceOf(addr1.address)).to.equal(1);
    });
});