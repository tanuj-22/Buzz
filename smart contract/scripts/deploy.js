const hre = require("hardhat");

async function main() {
  const profileImageMinterFactory = await hre.ethers.getContractFactory(
    "ProfileImageNfts"
  );
  const profileImageContract = await profileImageMinterFactory.deploy();

  await profileImageContract.deployed();

  console.log(
    `ProfileImageNfts Contract deployed to ${profileImageContract.address}`
  );
}

(async () => {
  try {
    await main();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();
