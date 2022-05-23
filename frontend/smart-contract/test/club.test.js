const { Framework } = require("@superfluid-finance/sdk-core");
const { assert } = require("chai");
const { ethers, web3 } = require("hardhat");
const daiABI = require("./abis/fDAIABI");

const deployFramework = require("@superfluid-finance/ethereum-contracts/scripts/deploy-framework");
const deployTestToken = require("@superfluid-finance/ethereum-contracts/scripts/deploy-test-token");
const deploySuperToken = require("@superfluid-finance/ethereum-contracts/scripts/deploy-super-token");

const provider = web3;

let accounts;

let sf;
let dai;
let daix;
let superSigner;
let Club;

const errorHandler = (err) => {
    if (err) throw err;
};

before(async function () {

    //get accounts from hardhat
    accounts = await ethers.getSigners();

    //deploy the framework
    await deployFramework(errorHandler, {
        web3,
        from: accounts[0].address,
    });

    //deploy a fake erc20 token
    let fDAIAddress = await deployTestToken(errorHandler, [":", "fDAI"], {
        web3,
        from: accounts[0].address,
    });
    //deploy a fake erc20 wrapper super token around the fDAI token
    let fDAIxAddress = await deploySuperToken(errorHandler, [":", "fDAI"], {
        web3,
        from: accounts[0].address,
    });
    
    //initialize the superfluid framework...put custom and web3 only bc we are using hardhat locally
    sf = await Framework.create({
        networkName: "custom",
        provider,
        dataMode: "WEB3_ONLY",
        resolverAddress: process.env.RESOLVER_ADDRESS, //this is how you get the resolver address
        protocolReleaseVersion: "test",
    });
    

    superSigner = await sf.createSigner({
        signer: accounts[0],
        provider: provider
    });
    //use the framework to get the super toen
    daix = await sf.loadSuperToken("fDAIx");
    
    //get the contract object for the erc20 token
    let daiAddress = daix.underlyingToken.address;
    dai = new ethers.Contract(daiAddress, daiABI, accounts[0]);
    let App = await ethers.getContractFactory("Club", accounts[0]);    
    
    Club = await App.deploy(
        accounts[1].address,
        sf.settings.config.hostAddress,
        daix.address
    );    
});

beforeEach(async function () {
    
    await dai.connect(accounts[0]).mint(
        accounts[0].address, ethers.utils.parseEther("1000")
    );

    await dai.connect(accounts[0]).approve(daix.address, ethers.utils.parseEther("1000"));

    const daixUpgradeOperation = daix.upgrade({
        amount: ethers.utils.parseEther("1000")
    });

    await daixUpgradeOperation.exec(accounts[0]);

    const daiBal = await daix.balanceOf({account: accounts[0].address, providerOrSigner: accounts[0]});
    console.log('daix bal for acct 0: ', daiBal);
});

describe("subscribe flows", async function () {    
    
    it("Case #1 - Alice subscribe to club", async () => {

        const appInitialBalance = await daix.balanceOf({
            account: Club.address,
            providerOrSigner: accounts[0]
        });
        
        const createFlowOperation = sf.cfaV1.createFlow({
            receiver: Club.address,
            superToken: daix.address,
            flowRate: "100000000",
        })    
                
        const txn = await createFlowOperation.exec(accounts[0]);

        const receipt = await txn.wait();

        const appFlowRate = await sf.cfaV1.getNetFlow({
            superToken: daix.address,
            account: Club.address,
            providerOrSigner: superSigner
          });

        const ownerFlowRate = await sf.cfaV1.getNetFlow({
            superToken: daix.address,
            account: accounts[1].address,
            providerOrSigner: superSigner
        })

        console.log("ownerFlowRate", ownerFlowRate)
        
        const appFinalBalance = await daix.balanceOf({
            account: Club.address,
            providerOrSigner: superSigner
        });       

        assert.equal(
            ownerFlowRate, "100000000", "owner not receiving 100% of flowRate"
        );

        assert.equal(
            appFlowRate,
            0,
            "App flowRate not zero"
        );

        assert.equal(
            appInitialBalance.toString(),
            appFinalBalance.toString(),
            "balances aren't equal"
        );
    });  
});




