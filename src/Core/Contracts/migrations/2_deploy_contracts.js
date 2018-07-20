var SafeCoin = artifacts.require("./SafeCoin.sol");
var TestContract = artifacts.require("./TestContract.sol");
var TestOverload = artifacts.require("./TestOverload.sol");

module.exports = function(deployer) {

    deployer.deploy(SafeCoin);

    deployer.deploy(TestContract);

    deployer.deploy(TestOverload);




};
