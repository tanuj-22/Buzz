require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.2",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/`+ process.env.ALCHEMY_API_KEY,
      accounts: [process.env.GOERLI_PRIVATE_KEY],
    },
  },
};
