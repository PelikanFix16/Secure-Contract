
const SafeCoinAddress = "0x3a040bf210db112c790de861550fc35444be0dd5";
const tradecenterAddress = "0x3470e94df46d37c82aa74ba06b16b6a65be291b8";


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
    /*

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

    var count = web3.eth.getTransactionCount(account0);

var account2 = "0x883ae23c4cf3d429bdf3b9b145fb629f83323f3c";

//console.log(count);

var gasL = tokenContract.transfer['address,uint256,bytes'].estimateGas(tradecenterAddress,200,'0x20',{from:account0});
console.log(String(gasL).toString('hex'));

    var rawTransaction = {

        "from": account0,
        "nonce":"0x"+count.toString(16),
        "gasLimit": gasL,
        "to":SafeCoinAddress,
        "value":"0x0",
        "data":tokenContract.transfer['address,uint256,bytes'].getData(tradecenterAddress,200,'0x20'),
        "chainId":1994

    };


var tx = new window.ethereumjs.Tx(rawTransaction);


console.log( Buffer.Buffer.from('0x6a6b2703ea413be70efcdb44b7d046ec2e166981556b1a2eeda0f180e506aee9','hex'));

var privat = '0x6a6b2703ea413be70efcdb44b7d046ec2e166981556b1a2eeda0f180e506aee9';


buf = Buffer.Buffer.from('6a6b2703ea413be70efcdb44b7d046ec2e166981556b1a2eeda0f180e506aee9','hex');

console.log(buf);

tx.sign(buf);


console.log(web3.eth);
var serializedTx = tx.serialize();

//var receipt = web3.eth.sendRawTransaction('0x'+serializedTx.toString('hex'));


console.log(tokenContract.balanceOf(account2));

web3.eth.getGasPrice(function(e,r){

    console.log(r/10**9);
});

console.log(web3.eth.getBlock('latest').gasLimit);
