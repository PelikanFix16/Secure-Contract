var SafeCoin = artifacts.require("./SafeCoin.sol");

module.exports = function(deployer) {

  deployer.deploy(SafeCoin);

};
