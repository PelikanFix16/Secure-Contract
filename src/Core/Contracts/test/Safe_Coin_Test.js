var SafeCoin = artifacts.require("SafeCoin");
var TestContract = artifacts.require("TestContract");


var totalSupply = 100000000000000000000000000000000000000000000000000;

function toWei(count){

    return count*10**18;


}

contract('SafeCoin', function(accounts) {


    it("Total Supply should be 100000000000000000000000000000000000000000000000000",function(){

        return SafeCoin.deployed().then(function(instance){
            return instance.totalSupply();

        }).then(function(total){

            assert.equal(total,totalSupply,"Total Supply is wrong");

        });

    });




    it("should put 100000000000000000000000000000000000000000000000000 SafeCoin in the first account", function() {
        return SafeCoin.deployed().then(function(instance) {
          return instance.balanceOf.call(accounts[0]);
        }).then(function(balance) {
          assert.equal(balance, totalSupply, "100000000000000000000000000000000000000000000000000 wasn't in the first account");
        });
      });

    it("Should Transfer 20 tokens",function(){
        return SafeCoin.deployed().then(function(instance){
            instance.transfer(accounts[1],totalSupply/2);
            return instance.balanceOf(accounts[1]);

        }).then(function(balance){

            assert.equal(balance,totalSupply/2,"Isn't send 20 tokens");


        });


    });



    it("Should have 99999999999999999999999999999999999999999999999980 tokens",function(){
        return SafeCoin.deployed().then(function(instance){
            return instance.balanceOf(accounts[0]);

        }).then(function(balance){

            assert.equal(balance.toNumber(),totalSupply/2,"isn't have 99999999999999999999999999999999999999999999999980");



        });


    });

    it("Should give accounts[1] allowence to spend tokens from owner account ",function(){

        var token;

        return SafeCoin.deployed().then(function(instance){
            token = instance;



            token.approve(accounts[1],(totalSupply/2)/2);

            return token.allowance(accounts[0],accounts[1]);


        }).then(function(result_allowed){

            assert.equal(result_allowed,(totalSupply/2)/2,"allowence is wrong");

        });

    });

    it("Should get from accounts[0] 25000000000000000000000000000000000000000000000000 tokens and send to account[2]",function(){

        return SafeCoin.deployed().then(function(instance){

            instance.transferFrom(accounts[0],accounts[2],(totalSupply/2)/2,{from:accounts[1]});

            return instance.balanceOf(accounts[2]);

        }).then(function(balance_account2){
            assert.equal(balance_account2,(totalSupply/2)/2,"account[2] amount is wrong");

        });

    });

    it("Should account[0] have 25000000000000000000000000000000000000000000000000 tokens ",function(){

        return SafeCoin.deployed().then(function(instance){
            return instance.balanceOf(accounts[0]);

        }).then(function(balance_account0){
            assert.equal(balance_account0,(totalSupply/2)/2,"account 0 have wrong value");

        });

    });

    it("Should account[1] have 50000000000000000000000000000000000000000000000000 tokens",function(){
        return SafeCoin.deployed().then(function(instance){
            return instance.balanceOf(accounts[1]);

        }).then(function(balance_account1){
            assert.equal(balance_account1,totalSupply/2,"account[1] have wrong value");

        });
    });

    it("Approvence should be 0 tokens for accounts[1]",function(){
        return SafeCoin.deployed().then(function(instance){

            return instance.allowance(accounts[0],accounts[1]);


        }).then(function(allow1){
            assert.equal(allow1,0,"allowance for accounts[1] should be 0");

        });
    });

    //TODO test transfer function for contracts
    //create new contract implementing ERC223ReceivingContract
    //And check contract receive tokens



});

