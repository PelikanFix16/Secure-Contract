
const SafeCoinAddress = "0x0e6edc31eb5022fac29a442493d89db41e21ce67";
const tradecenterAddress = "0x3890025b77cc5dd3841e8914abb59c625ff6a5e4";



class Person{

    //TODO hash img (IPFS) protocol from another contract

    constructor(address,contract,name){
        this.address = address;
        this.contract = contract;
        this.name = name;
    }

    getTokensBalance(){

        return this.contract.balanceOf(this.address);

    }

    transferTokens(address,tokens){

        this.contract.transfer(address,web3.toWei(tokens,'ether'),{from:this.address});

    }


}



function CreatePerson(person){


    this.person = person;

    var createContainer = function(){

        var container = document.createElement("div");
        container.setAttribute("class","person");

        container.onclick = ()=>{


            var SelectedPerson = document.getElementById("selected");
            var SelectedAddress = document.getElementById("address");

            SelectedPerson.innerHTML = "Selected Person: "+person.name;
            SelectedAddress.innerHTML = "Selected address: "+person.address;


            var btn = document.getElementById("btn");

            btn.onclick = ()=>{

                var value = document.getElementById("text_input").value;
                var number = document.getElementById("number_input").value;

                if(value !== ""){

                    person.transferTokens(value,number);

                    location.reload();


                }

            };
        };

        return container;
    }

    var createImg = function(){

        var img = document.createElement("img");

        //TODO set atribute src to IPFS hash to load from network

        img.setAttribute("src","");

        return img;
    }

    var createName = function(){

        var name = document.createElement("h1");

        name.appendChild(document.createTextNode(person.name));

        return name;
    }

    var createTokens = function(){

        var tokens = document.createElement("p");
        tokens.appendChild(document.createTextNode("Tokens: "));
        tokens.appendChild(document.createTextNode(person.getTokensBalance()/10**18));

        return tokens;
    }

    this.getPerson = function(){

        var container = createContainer();

        container.appendChild(createImg());
        container.appendChild(createName());
        container.appendChild(createTokens());


        return container;

    }


}


if(typeof web3 !== 'undefined'){

    web3 = new Web3(web3.currentProvider);

}else{
    //TODO change Http provider to mainnet

    web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

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
          "name": "_from",
          "type": "address"
        }
      ],
      "name": "getBalances",
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

    var temp = document.getElementById("container");

    var person1 = new Person(account0,tokenContract,"xyz0");

    var person2 = new Person(account1,tokenContract,"xyz1");


    var person01 = new CreatePerson(person1);

    var person02 = new CreatePerson(person2);

    temp.appendChild(person01.getPerson());


    temp.appendChild(person02.getPerson());

    console.log(tokenContract.transfer['address,uint256,bytes'](tradecenterAddress,web3.toWei(20,'ether'),web3.toAscii("te"),{from:account0}));

        //("0xab327cdaf135c3dcacf58a4686f11dcd0ef1d031",web3.toWei(20,'ether'),'tes'));


    var balance = tradeCenter.getBalances(account0);

    console.log(balance);

}

