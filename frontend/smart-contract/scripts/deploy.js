const hre = require("hardhat");
const toWei = (value) => ethers.utils.parseEther(value.toString());

async function main() {

  const host = '0xEB796bdb90fFA0f28255275e16936D25d3418603';
  const fDAIx = '0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f';

  //your address here...
  const adminWallet = "0x5966aa11c794893774a382d9a19743B8be6BFFd1";
  const Club = await ethers.getContractFactory("Club");
  const club = await Club.deploy(adminWallet, host, fDAIx);
  await club.deployed();

  console.log("deployed club :", club.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
