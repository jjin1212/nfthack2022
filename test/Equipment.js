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
    it("getEquipmentStats function", async function() {
        stats = await(equipment.getEquipmentStats(0))
        arr = stats[0].toNumber(), stats[1].toNumber();
        expect(arr).to.equal(2,20);

        stats = await(equipment.getEquipmentStats(1))
        arr = stats[0].toNumber(), stats[1].toNumber();
        expect(arr).to.equal(6,30);

        stats = await(equipment.getEquipmentStats(2))
        arr = stats[0].toNumber(), stats[1].toNumber();
        expect(arr).to.equal(10,40);
    })
});
