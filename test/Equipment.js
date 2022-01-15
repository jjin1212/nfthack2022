const { expect } = require("chai");

describe("Equipment contract", function () {

    let equipment;
    let attackBoosts;
    let hpBoosts;

    beforeEach(async function () {
        const equipmentContractFactory = await ethers.getContractFactory("EquipmentContract");
        attackBoosts = [2, 6, 10];
        hpBoosts = [20, 30, 40];
        equipment = await equipmentContractFactory.deploy(attackBoosts, hpBoosts);
    })

    it("Check Constructor", async function () {
        for (let i = 0; i < 3; i++) {
            expect(await equipment.equipAttack(i)).to.equal(attackBoosts[i])
            expect(await equipment.equipHp(i)).to.equal(hpBoosts[i])
        }
    });
    it("mint function", async function() {
        const [owner, addr1] = await ethers.getSigners();
        await equipment.connect(addr1).mint(0, 1);
        expect(await equipment.balanceOf(addr1.address, 0)).to.equal(1);
    });
});