
const SafeCoinAddress = "0x5f805e9e3916ee9f71ee7e6afb81d802215f2753";
const tradecenterAddress = "0x566095a1fac3907d6b811ca2cc4968c2efccb293";

/*
function isAccountLocked(account) {
    try {
        web3.eth.sendTransaction({
            from: account,
            to: account,
            value: 0
        });
        return false;
    } catch (err) {
        return (err.message == "authentication needed: password or unlock");
    }
}


async function waitFor(hash){
    let s = await web3.eth.getTransactionReceipt(hash);
    if(!s){
        waitFor(hash);
    }
}
*/

async function createContract(tokens,data,sender) {

    if(!web3.isAddress(sender)){
        console.log("bad address");
        return false;
    }


    if(typeof tokens !== 'number'){
        console.log("bad number");
        return false;
    }

    if(typeof data !== 'string'){
        console.log("bad data");
        return false;
    }

    let gasCost = await tokenContract.transfer['address,uint256,bytes'].estimateGas(tradecenterAddress,web3.toWei(tokens,"ether"),web3.fromAscii(data));
    console.log(gasCost);
    let hashT =  await tokenContract.transfer['address,uint256,bytes'].sendTransaction(tradecenterAddress,web3.toWei(tokens,"ether"),web3.fromAscii(data),{from:sender,gas:gasCost});
    console.log(hashT);
    return hashT;
}


function getContract(_index,_adr) {

    if(!Number.isInteger(_index)){
        return false;
    }
    if(!web3.isAddress(_adr)){
        return false;
    }

    let creator = tradeCenter.getCreator.call(_index,{from:_adr});
    let recipient = tradeCenter.getRecipient.call(_index,{from:_adr});
    let tokens = web3.fromWei(tradeCenter.getTokens.call(_index,{from:_adr}),"ether");
    let data = web3.toAscii(tradeCenter.getData.call(_index,{from:_adr}));
    let creatorAcceptation = tradeCenter.getAcceptation.call(_index,{from:creator});
    let recipientAcceptation = tradeCenter.getAcceptation.call(_index,{from:recipient});
    let creatorReject = tradeCenter.getReject.call(_index,{from:creator});
    let recipientReject = tradeCenter.getReject.call(_index,{from:recipient});

    return {contractCreator:creator,contractRecipient:recipient,contractTokens:tokens,contractData:data,contractCreatorAccepted:creatorAcceptation,contractRecipientAccepted:recipientAcceptation,
            contractCreatorRejected:creatorReject,contractRecipientreject:recipientReject};

}

async function unlockAccount(adr,pass) {

    if(!web3.isAddress(adr)){
        return false;
    }

   return await web3.personal.unlockAccount(adr,pass,1);
}

async function addRecipient(index,adr1,adr2) {
     if(!web3.isAddress(adr1)){
        return false;
     }
    if(!web3.isAddress(adr2)){
    return false;
    }

    let gasC = tradeCenter.addRecipient.estimateGas(adr1,index,{from:adr2});
    console.log(gasC);
    let hashT = tradeCenter.addRecipient.sendTransaction(adr1,index,{from:adr2,gas:gasC});
    console.log(hashT);
}

async function acceptContract(index,adr){
    if(!web3.isAddress(adr)){
        return false;
    }

    let gasC = await tradeCenter.acceptContract.estimateGas(index,{from:adr});
    console.log(gasC);
    let s = await tradeCenter.acceptContract.sendTransaction(index,{from:adr,gas:gasC});
    console.log(s);

}

async function rejectContract(index,adr){

    if(!web3.isAddress(adr)){
        return false;
    }

    let gasC = await tradeCenter.rejectContract.estimateGas(index,{from:adr});
    console.log(gasC);
    let s = await tradeCenter.rejectContract.sendTransaction(index,{from:adr,gas:gasC});
    console.log(s);
}

    /*
function getAcceptation(adr) {

    if(!web3.isAddress(adr)){
        return false;
    }

    return tradeCenter.getAcceptation.call({from:adr});


}

async function rejectContract(adr){
    if(!web3.isAddress(adr)){
        return false;
    }
    let gasC = await tradeCenter.rejectContract.estimateGas({from:adr});
    console.log(gasC);
    let s = await tradeCenter.rejectContract.sendTransaction({from:adr,gas:gasC});
    console.log(s);
}

function getRejected(adr){
    if(!web3.isAddress(adr)){
        return false;
    }
    return tradeCenter.getReject.call({from:adr});
}

function getData(adr) {

    if(!web3.isAddress(adr)){
        return false;


    }

    var data =  tradeCenter.getData.call({from:adr});
    return web3.toAscii(data);

}

async function acceptContract(adr) {

    if(!web3.isAddress(adr)){
        console.log("ta");
        return false;
    }


         let gasC = await tradeCenter.acceptContract.estimateGas({from:adr});
     console.log(gasC);
    let s = await tradeCenter.acceptContract.sendTransaction({from:adr,gas:gasC});
    console.log(s);
}

async function unlockAccount(adr,pass) {


   return await web3.personal.unlockAccount(adr,pass,1);
}

async function addRecipient(adr,cr) {

    if(!web3.isAddress(adr)){
        return false;
    }

       let gasCost = await tradeCenter.addRecipient.estimateGas(adr,{from:cr});
     console.log(gasCost);
    let s = await tradeCenter.addRecipient.sendTransaction(adr,{from:cr});

}

async function getTokens(adr){

    return web3.fromWei(tradeCenter.getTokens({from:adr}),"ether");
}

*/

if(typeof web3 !== 'undefined'){

    web3 = new Web3(web3.currentProvider);

}else{
    //TODO change Http provider to mainnet

    web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));


}
    //main account[0] only for tests

    web3.eth.defaultAccount = web3.eth.accounts[0];

    var tokenContract = web3.eth.contract([
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "tokens",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "tokenOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "tokens",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "takeOwner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "tokenOwner",
          "type": "address"
        },
        {
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "remaining",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "spender",
          "type": "address"
        },
        {
          "name": "tokens",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "from",
          "type": "address"
        },
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "tokens",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "tokens",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "tokens",
          "type": "uint256"
        },
        {
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
    ]).at(SafeCoinAddress);


    var tradeCenter = web3.eth.contract(
[
    {
      "inputs": [
        {
          "name": "_safe",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        },
        {
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "tokenFallback",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "contractAvailable",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getAvailableIndex",
      "outputs": [
        {
          "name": "",
          "type": "uint256[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_recipient",
          "type": "address"
        },
        {
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "addRecipient",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "acceptContract",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "rejectContract",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "getReject",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "getAcceptation",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "getData",
      "outputs": [
        {
          "name": "",
          "type": "bytes"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "getTokens",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "getCreator",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "getRecipient",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]
    ).at(tradecenterAddress);



    var account0 = web3.eth.accounts[0];

    var account1 = web3.eth.accounts[1];

    unlockAccount(account0,'test');
    unlockAccount(account1,'test1');

// createContract(20,"test kontrakt",account1);

//addRecipient(2,account0,account1);
//console.log(getContract(1,account0));

//console.log(tradeCenter.getAvailableIndex({from:account0}));

// acceptContract(0,account0);

console.log(tokenContract.balanceOf.call(account1));

//rejectContract(2,account0);





/*
    var hash = 0;

    var stageOne = false;

    var recipient ;

    var creator;


    var createContractBtn = document.getElementById("CreateBtn");

    createContractBtn.onclick = () => {

        var DataInput = document.getElementById("inData");
        var TokensInput = document.getElementById("inTokens");
        var RecipientInput = document.getElementById("inRecipient");
        var CreatorInput = document.getElementById("inCreator");

        if(DataInput.value && TokensInput.value && RecipientInput.value && CreatorInput.value){


            if(isAccountLocked(CreatorInput.value)){
               var pass =  prompt("Passowrd to unlock account "+CreatorInput.value);

                unlockAccount(CreatorInput.value,pass).then(function(res){
                    if(res == true){
                hash = createContract(Number(TokensInput.value),DataInput.value,CreatorInput.value);
                    }
                });

            }

            // hash = createContract(Number(TokensInput.value),DataInput.value,CreatorInput.value);

            recipient = RecipientInput.value;

            creator = CreatorInput.value;
        }
    };


var GetDataButton = document.getElementById("DataBtn");

GetDataButton.onclick = () => {

    var infoData = document.getElementById("iData");
    var infoTokens = document.getElementById("iTokens");
    var infoRecipient = document.getElementById("iRecipient");
    var infoCreator = document.getElementById("iCreator");
    var infoCreatorAccepted = document.getElementById("iCreatorAccepted");
    var infoRecipientAccepted = document.getElementById("iRecipientAccepted");
    var infoCreatorRejected = document.getElementById("iCreatorRejected");
    var infoRecipientRejected = document.getElementById("iRecipientRejected");

    infoData.innerHTML = getData(creator);
    infoTokens.innerHTML = web3.fromWei(tradeCenter.getTokens({from:creator}),"ether")
    infoRecipient.innerHTML = recipient;
    infoCreator.innerHTML = creator;
    infoCreatorAccepted.innerHTML = getAcceptation(creator);
    infoRecipientAccepted.innerHTML = getAcceptation(recipient);
    infoCreatorRejected.innerHTML = getRejected(creator);
    infoRecipientRejected.innerHTML = getRejected(recipient);
};

var acceptContract = document.getElementById("acceptContract");

acceptContract.onclick = () => {

    var acceptedAddress = document.getElementById("inputAddressAccpeted");

    if(!web3.isAddress(acceptedAddress.value)){
        console.log("bad address");
    }
         if(isAccountLocked(acceptedAddress.value)){
               var pass =  prompt("Passowrd to unlock account "+acceptedAddress.value);

                unlockAccount(acceptedAddress.value,pass).then(function(res){
                    if(res == true){
                           let gasC =  tradeCenter.acceptContract.estimateGas({from:acceptedAddress.value});
                            console.log(gasC);
                                    let s =  tradeCenter.acceptContract.sendTransaction({from:acceptedAddress.value,gas:gasC});
                                    console.log(s);
                    }


                });

            }
};

var balanceBtn = document.getElementById("showBallance");

balanceBtn.onclick = () => {

    var balanceAdr = document.getElementById("balanceAddres");
    if(!web3.isAddress(balanceAdr.value)){
        console.log("bad address");
    }

        alert(web3.fromWei(tokenContract.balanceOf.call(balanceAdr.value),"ether"));
};

function stageTwo(){

    if(isAccountLocked(creator)){
       var pass =  prompt("Passowrd to unlock account "+creator);

        unlockAccount(creator,pass).then(function(res){
            if(res == true){
                hash = addRecipient(recipient,creator);
            }
        });

    }
}

var rejectBtn = document.getElementById("rejectContract");

rejectBtn.onclick = () => {

    var rejectedAddress = document.getElementById("inputAddressRejected");
    if(!web3.isAddress(rejectedAddress.value)){
        console.log("bad address");
    }
        if(isAccountLocked(rejectedAddress.value)){
            var pass = prompt("Password to unlock account "+rejectedAddress.value);
            unlockAccount(rejectedAddress.value,pass).then(function(res){
                if(res == true){
                    rejectContract(rejectedAddress.value);
                }
            });
        }

};




setInterval(function(){
try{
hash.then(function(result){
    if(web3.eth.getTransactionReceipt(result)){
        console.log("Accepted");
        hash = 0;
        stageTwo();
    }
});
}
catch(e){
    console.log("waiting for transaction");
}

},5000);


*/
