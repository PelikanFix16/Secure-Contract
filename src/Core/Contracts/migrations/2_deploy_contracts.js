
var SafeCoin = artifacts.require("./SafeCoin.sol");
var TradeCenter = artifacts.require("./TradeCenter.sol");
//var ICO = artifacts.require("./ICO.sol");
module.exports = function(deployer) {

    //let ac1 = web3.eth.accounts[0];
    deployer.deploy(SafeCoin).then(function(){
        deployer.deploy(TradeCenter, SafeCoin.address);
        //deployer.deploy(ICO,ac1,web3.toWei(20,'ether'),20,web3.toWei(0.0038,'ether'),SafeCoin.address);
    });


};
