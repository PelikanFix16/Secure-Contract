
var SafeCoin = artifacts.require("./SafeCoin.sol");
var TradeCenter = artifacts.require("./TradeCenter.sol");

module.exports = function(deployer) {

    deployer.deploy(SafeCoin);
    deployer.deploy(TradeCenter);

};
