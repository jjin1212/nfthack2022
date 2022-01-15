// const { expect } = require("chai");

// describe("Random Number Consumer", function () {

//     let rand;

//     beforeEach(async function () {
//         const randFactory = await ethers.getContractFactory("RandomNumberConsumer");
//         rand = await randFactory.deploy();
//     })

//     it("get random number", async function() {
//         const [owner] = await ethers.getSigners();
//         console.log(rand)
//         await rand.getRandomNumber()
//     });
// });