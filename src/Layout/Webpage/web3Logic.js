
const SafeCoinAddress = "0x306441ef9e480a016875dc52aaac440e0ff49f8d";
const tradecenterAddress = "0x27131ae19907ef5e70df9783281d661297399848";






async function createContract(address,tokens,data,sender) {

    if(!web3.isAddress(address)){

        return false;
    }

    if(!web3.isAddress(sender)){
        return false;
    }


    if(typeof tokens !== 'number'){
        return false;
    }

    if(typeof data !== 'string'){
        return false;
    }

    let gasCost = await tokenContract.transfer['address,uint256,bytes'].estimateGas(address,web3.toWei(tokens,"ether"),web3.fromAscii(data));

    return await tokenContract.transfer['address,uint256,bytes'].sendTransaction(address,web3.toWei(tokens,"ether"),web3.fromAscii(data),{from:sender,gas:gasCost});



}

function getAcceptation(adr) {

    if(!web3.isAddress(adr)){
        return false;
    }

    return tradeCenter.getAcceptation.call({from:adr});


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
        return false;
    }


    let gasCost = await tradeCenter.acceptContract.estimateGas({from:account0});
    console.log(gasCost);
    let s = await tradeCenter.acceptContract.sendTransaction({from:adr,gas:gasCost});
    //let ret = getAcceptation(adr);
    // return ret;

    let gasCost2 = await tradeCenter.finalize.estimateGas({from:adr});
    console.log(gasCost2);
    let w = await tradeCenter.finalize.sendTransaction({from:adr,gas:gasCost2});
}

async function unlockAccount(adr,pass) {


   return await web3.personal.unlockAccount(adr,pass,1);
}

async function addRecipient(adr,cr) {

    if(!web3.isAddress(adr)){
        return false;
    }

    let gasCost = await tradeCenter.addRecipient.estimateGas(adr);
    let s = await tradeCenter.addRecipient.sendTransaction(adr,{from:cr,gas:gasCost});

}



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
      "constant": false,
      "inputs": [
        {
          "name": "_recipient",
          "type": "address"
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
      "inputs": [],
      "name": "acceptContract",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "finalize",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
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
      "inputs": [],
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
      "inputs": [],
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
    }
  ]
    ).at(tradecenterAddress);



    var account0 = web3.eth.accounts[0];

    var account1 = web3.eth.accounts[1];


    console.log(unlockAccount(account0,'test'));

    console.log(unlockAccount(account1,'test1'));


// console.log(createContract(tradecenterAddress,200,"test21",account0));



//console.log(tokenContract.balanceOf.call(account1));

// console.log(addRecipient(account1,account0));

//console.log(acceptContract(account1));
console.log(getAcceptation(account1));

//console.log(getData(account0));

