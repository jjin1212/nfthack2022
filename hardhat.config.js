require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  solidity: '0.8.4',
  defaultNetwork: "ropsten",
  networks: {
    // rinkeby: {
    //   url: process.env.ALCHEMY_RINKEBY_URL,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/2DUM5x4UP5AkHMuppjyiXqre7ZYOPAm3",
      accounts: ["3751fefcba86c0798bd192b1c627c55257aa832d8fe80e5f69ca6f926b92fa7b"],
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY
  }
};