
const SafeCoinAddress = "0xdb261783579e41b6f2ace7a82bb66cf9d596e4c5";
const tradecenterAddress = "0xcf655dcf9729474ad399206c3ab8b6c4afd826c0";


var currentContractIndex = null;


function CreateSafeContract(_creator,_uint256,_bytes,_password) {



        if(fileOb === null){
            throw "No load file to get private key";
        }
        if(!web3.isAddress(_creator)){
            throw "Parametr is not address";
        }
        if(isNaN(_uint256)){
            throw "Parametr is not number";
        }
        if(typeof _bytes !== 'string'){
            throw "Parametr is not string";
        }
        if(typeof _password !== 'string'){
            throw "Password is not stirng";
        }
        if(_bytes == ""){
            throw "No Info data";
        }


        creator = _creator;
        uint256 = web3.toWei(_uint256,'ether');
        bytes = web3.fromAscii(_bytes);
        password = _password;


        let count = web3.eth.getTransactionCount(creator);

        let gasL = tokenContract.transfer['address,uint256,bytes'].estimateGas(tradecenterAddress,uint256,bytes,{from:creator});
        let rawTransaction = {

            "from": creator,
            "nonce":"0x"+count.toString(16),
            "gasLimit": gasL,
            "to":SafeCoinAddress,
            "value":"0x0",
            "data":tokenContract.transfer['address,uint256,bytes'].getData(tradecenterAddress,uint256,bytes),
            "chainId":1994
        };


        let tx = new window.ethereumjs.Tx(rawTransaction);

        let privateKey = window.keythereum.recover(password,fileOb);
        privateKey = privateKey.toString('hex');

        let buf = Buffer.Buffer.from(privateKey,'hex');
        tx.sign(buf);
        let serializedTx = tx.serialize();
        let recipt = web3.eth.sendRawTransaction('0x'+serializedTx.toString('hex'));


}




class ContractManager {

    constructor(_address){

        if(!web3.isAddress(_address)){
            throw "Address is incorrect";

        }

        this.mainAddress = _address;

    }

    get getAllContract() {

        let contractsIndex = tradeCenter.getAvailableIndex.call({from:this.mainAddress});
        let arr = [];
        for(let i=0;i<contractsIndex.length;i++){
            arr.push(contractsIndex[i].c[0]);

        }
        return arr;
    }

    biggestNumber(index) {
        if(index > Math.max(this.getAllContract)){
            throw "Index is to big";
        }
    }

     getRecipientContract(index) {

         this.biggestNumber(index);

         return tradeCenter.getRecipient.call(index,{from:this.mainAddress});

    }

    isHistory(index) {

        this.biggestNumber(index);

        let recipient = this.getRecipientContract(index);

        if(!web3.isAddress(recipient)){
            throw "Recipient is not set";
        }
            if(tradeCenter.getAcceptation.call(index,{from:this.getCreator(index)}) &&
                tradeCenter.getAcceptation.call(index,{from:recipient})){
                return true;
            }
            if(tradeCenter.getReject.call(index,{from:this.getCreator(index)}) &&
                tradeCenter.getReject.call(index,{from:recipient})){
                return true;

            }

            return false;



    }




    getTokens(index) {
        this.biggestNumber(index);
        return web3.fromWei(tradeCenter.getTokens.call(index,{from:this.mainAddress})).c[0];

    }
    getData(index) {

        this.biggestNumber(index);
        return web3.toAscii(tradeCenter.getData.call(index,{from:this.mainAddress}));

    }

    addRecipient(addressRec,index,password) {
        this.biggestNumber(index);
        if(!web3.isAddress(addressRec)){
            throw "Address is inncorect";
        }
        let count = web3.eth.getTransactionCount(this.mainAddress);
        let gasL = tradeCenter.addRecipient.estimateGas(addressRec,index,{from:this.mainAddress});
        let rawTransaction = {
            "from":this.mainAddress,
            "nonce":"0x"+count.toString(16),
            "gasLimit":gasL,
            "to":tradecenterAddress,
            "value":"0x0",
            "data":tradeCenter.addRecipient.getData(addressRec,index),
            "chainId":1994

        };

        let tx = new window.ethereumjs.Tx(rawTransaction);

        let privateKey = window.keythereum.recover(password,fileOb);
        privateKey = privateKey.toString('hex');

        let buf = Buffer.Buffer.from(privateKey,'hex');
        tx.sign(buf);
        let serializedTx = tx.serialize();
        let recipt = web3.eth.sendRawTransaction('0x'+serializedTx.toString('hex'));

    }

     getCreator(index) {
        this.biggestNumber(index);
        return tradeCenter.getCreator.call(index,{from:this.mainAddress});
     }

    acceptContract(index) {

        this.biggestNumber(index);

        let count = web3.eth.getTransactionCount(this.mainAddress);



    }

    acceptContract(index,password) {


        this.biggestNumber(index);


        let count = web3.eth.getTransactionCount(this.mainAddress);
        let gasL = tradeCenter.acceptContract.estimateGas(index,{from:this.mainAddress});
        let rawTransaction = {
            "from":this.mainAddress,
            "nonce":"0x"+count.toString(16),
            "gasLimit":gasL,
            "to":tradecenterAddress,
            "value":"0x0",
            "data":tradeCenter.acceptContract.getData(index),
            "chainId":1994
        };
        let tx = new window.ethereumjs.Tx(rawTransaction);

        let privateKey = window.keythereum.recover(password,fileOb);
        privateKey = privateKey.toString('hex');

        let buf = Buffer.Buffer.from(privateKey,'hex');
        tx.sign(buf);
        let serializedTx = tx.serialize();
        let recipt = web3.eth.sendRawTransaction('0x'+serializedTx.toString('hex'));



    }

    getAcceptation(index,adr) {

        this.biggestNumber(index);
        if(!web3.isAddress(adr)){
            throw "Inncorect address";
        }
        return tradeCenter.getAcceptation.call(index,{from:adr});

    }

    rejectContract(index,password) {

        this.biggestNumber(index);
        let count = web3.eth.getTransactionCount(this.mainAddress);
        let gasL = tradeCenter.rejectContract.estimateGas(index,{from:this.mainAddress});

        let rawTransaction = {
            "from":this.mainAddress,
            "nonce":"0x"+count.toString(16),
            "gasLimit":gasL,
            "to":tradecenterAddress,
            "value":"0x0",
            "data":tradeCenter.rejectContract.getData(index),
            "chainId":1994
        };

        let tx = new window.ethereumjs.Tx(rawTransaction);

        let privateKey = window.keythereum.recover(password,fileOb);
        privateKey = privateKey.toString('hex');

        let buf = Buffer.Buffer.from(privateKey,'hex');
        tx.sign(buf);
        let serializedTx = tx.serialize();
        let recipt = web3.eth.sendRawTransaction('0x'+serializedTx.toString('hex'));
    }

    getReject(index,adr) {

        this.biggestNumber(index);
        if(!web3.isAddress){
            throw "Inncorect address";

        }
        return tradeCenter.getReject.call(index,{from:adr});
    }

};

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

//  let gasCost =  tokenContract.transfer['address,uint256,bytes'].estimateGas(tradecenterAddress,web3.toWei(1,"ether"),web3.fromAscii("fd"));
//  console.log(gasCost);
//   let hashT =   tokenContract.transfer['address,uint256,bytes'].sendTransaction(tradecenterAddress,web3.toWei(1,"ether"),web3.fromAscii("fd"),{from:account1,gas:gasCost});
//
var adr = document.getElementById("addressProfile");
var tok = document.getElementById("tokensProfile");
var eth = document.getElementById("ethProfile");
address = address.replace("#","");


function recipientCreatorSetter(contractM,index,text,inputChange,ledCre,ledRe){
    if(contractM.mainAddress == contractM.getCreator(index)){
        text.innerHTML = "Recipient:";
        inputChange.value = contractM.getRecipientContract(index);
    }else {

        text.innerHTML = "Creator:";
        inputChange.value = contractM.getCreator(index);
    }

        if(contractM.getAcceptation(index,contractM.getCreator(index))){
            ledCre[0].style.backgroundColor = "green";

        }else {

            ledCre[0].style.backgroundColor = "red";
        }
        if(contractM.getAcceptation(index,contractM.getRecipientContract(index))){
            ledRe[0].style.backgroundColor = "green";

        }else {

            ledRe[0].style.backgroundColor = "red";
        }
    if(contractM.getReject(index,contractM.getCreator(index))){
        ledCre[1].style.backgroundColor = "green";

    }else {
        ledCre[1].style.backgroundColor = "red";
    }
    if(contractM.getReject(index,contractM.getRecipientContract(index))){
        ledRe[1].style.backgroundColor = "green";

    }else {

        ledRe[1].style.backgroundColor = "red";
    }
}

function generateInfo(contractM,index) {

    if(contractM.mainAddress == contractM.getCreator(index)){
        return "Recipient:"+contractM.getRecipientContract(index).substring(0,lenghtAddress)+"<br>"+"Info:"+contractM.getData(index);

    }else {

        return "Creatort:"+contractM.getCreator(index).substring(0,lenghtAddress)+"<br>"+"Info:"+contractM.getData(index);
    }

}

function showInDiv() {

    let contractManager = new ContractManager(address);

    let contractIndexArray = contractManager.getAllContract;

    let currentCol = document.getElementById("CurrentContract");

    let historyCol = document.getElementById("HistoryContract");

    let historyP = document.createElement("p");
    historyP.className = "text-center";
    historyP.innerHTML = "History";
    historyCol.innerHTML = "";
    historyCol.appendChild(historyP);

    let currentP = document.createElement("p");
    currentP.className = "text-center";
    currentP.innerHTML = "Current";
    currentCol.innerHTML = "";
    currentCol.appendChild(currentP);


    let valueT = document.getElementById("InputValue");
    let data = document.getElementById("InputData");
    let recipientD = document.getElementById("InputRecipient");
    let btnContract = document.getElementById("CreateContractBtn")
    let recipientDivD = document.getElementById("addRecipientDiv");
    let acButton = document.getElementById("AcceptContract");
    let reButton = document.getElementById("RejectContract");

    let ledCreatorAc = document.getElementById("CreatorInfoAceLed");
    let ledRecipieAc = document.getElementById("RecipientInfoAceLed");
    let recText = document.getElementById("Recipient");

    let ledCreatorRe = document.getElementById("CreatorInfoRejLed");
    let ledRecipieRe = document.getElementById("RecipientInfoRejLed");

    for(let i=0;i<contractIndexArray.length;i++){


        if(!web3.isAddress(contractManager.getRecipientContract(contractIndexArray[i]))){
            let currentDivNoRecipient = document.createElement("div");
            currentDivNoRecipient.className = "row-md-4 smallView";
            let noRecipient = document.createElement("div");
            noRecipient.className = "noRecipientSet";
            let noTextRec = document.createTextNode("No Recipient Set");
            noRecipient.appendChild(noTextRec);
            currentDivNoRecipient.appendChild(noRecipient);

            currentDivNoRecipient.onclick = function(e) {

                let indexCurrent = contractIndexArray[i];

                let tokensCount = contractManager.getTokens(indexCurrent);

                valueT.value = tokensCount;
                valueT.disabled = true;

                let dataCurrent = contractManager.getData(indexCurrent);
                data.value = dataCurrent;
                data.disabled = true;

                recipientD.disabled = false;
                recipientDivD.style.display = "block";
                btnContract.style.display = "block";
                currentContractIndex = indexCurrent;

                acButton.style.display = "none";
                reButton.style.display = "none";
                recText.innerHTML = "Recipient:";
                document.getElementById("infoToShow").style.display = "none";

                recipientD.value = "";
            };

            currentDivNoRecipient.innerHTML += "Info:"+contractManager.getData(contractIndexArray[i]);
            currentCol.appendChild(currentDivNoRecipient);


            continue;

        }

        if(contractManager.isHistory(contractIndexArray[i])){



            let currentDivNoRecipient = document.createElement("div");
            currentDivNoRecipient.className = "row-md-4 smallView";
            currentDivNoRecipient.innerHTML = generateInfo(contractManager,contractIndexArray[i]);
            currentDivNoRecipient.id = "contractIndex"+contractIndexArray[i];
            currentDivNoRecipient.onclick = function() {

                let indexCurrent = contractIndexArray[i];
                let tokensCount = contractManager.getTokens(indexCurrent);
                valueT.value = tokensCount;
                valueT.disabled = true;
                let dataCurrent = contractManager.getData(indexCurrent);
                data.value = dataCurrent;
                data.disabled = true;
                recipientDivD.style.display = "block";
                btnContract.style.display = "block";
                currentContractIndex = indexCurrent;
                recipientCreatorSetter(contractManager,indexCurrent,recText,recipientD,[ledCreatorAc,ledCreatorRe],[ledRecipieAc,ledRecipieRe]);
                recipientD.disabled = true;
                acButton.style.display = "none";
                reButton.style.display = "none";

                document.getElementById("infoToShow").style.display = "block";
                btnContract.innerHTML = "Create Contract";
            }


            currentDivNoRecipient.style.backgroundColor = "#ffe6e6";
            historyCol.appendChild(currentDivNoRecipient);



        }else {

            let currentDivNoRecipient = document.createElement("div");
            currentDivNoRecipient.className = "row-md-4 smallView";
            currentDivNoRecipient.innerHTML = generateInfo(contractManager,contractIndexArray[i]);
            currentDivNoRecipient.id = "contractIndex"+contractIndexArray[i];

            currentDivNoRecipient.onclick = function(e) {
                let indexCurrent = contractIndexArray[i];
                let tokensCount = contractManager.getTokens(indexCurrent);
                valueT.value = tokensCount;
                valueT.disabled = true;
                let dataCurrent = contractManager.getData(indexCurrent);
                data.value = dataCurrent;
                data.disabled = true;
                recipientDivD.style.display = "block";
                btnContract.style.display = "block";
                currentContractIndex = indexCurrent;
                recipientCreatorSetter(contractManager,indexCurrent,recText,recipientD,[ledCreatorAc,ledCreatorRe],[ledRecipieAc,ledRecipieRe]);
                recipientD.disabled = true;
                acButton.style.display = "block";
                reButton.style.display = "block";

                document.getElementById("infoToShow").style.display = "block";
                console.log(indexCurrent);
                btnContract.innerHTML = "Create Contract";

            };

            currentDivNoRecipient.style.backgroundColor = "#e6f2ff";


            currentCol.appendChild(currentDivNoRecipient);

        }







    }

}

//TODO delete apply



window.onload = function(){


    document.getElementById("AcceptContract").style.display = "none";
    document.getElementById("RejectContract").style.display = "none";



    document.getElementById("infoToShow").style.display = "none";

    showInDiv();



    adr.innerHTML = address;

    tok.innerHTML = web3.fromWei(tokenContract.balanceOf.call(address),"ether");
    eth.innerHTML = web3.fromWei(web3.eth.getBalance(address));


};

setInterval(function(){


    tok.innerHTML = web3.fromWei(tokenContract.balanceOf.call(address),"ether");
    eth.innerHTML = web3.fromWei(web3.eth.getBalance(address));


    showInDiv();
    if(currentContractIndex != null){
    document.getElementById("contractIndex"+currentContractIndex).click();
    }

},3000)



document.getElementById("CreateContractBtn").onclick = function(e){

    let valueT = document.getElementById("InputValue");
    let data = document.getElementById("InputData");
    let recipientD = document.getElementById("InputRecipient");
    let recipientDivD = document.getElementById("addRecipientDiv");


     if(valueT.disabled && data.disabled && recipientD.value != '' && !recipientDivD.disabled && !recipientD.disabled) {

        if(currentContractIndex == null){
            throw "No Contract select";
        }

        let contractMa = new ContractManager(address);
        let pass = prompt("Enter password for account");
        contractMa.addRecipient(recipientD.value,currentContractIndex,pass);

        valueT.value = "";
        data.value = "";
        recipientDivD.style.display = "none";
        recipientD.value = "";
        e.target.style.display = "none";
        data.disabled = false;
        valueT.disabled = false;
        e.target.innerHTML = "Create Contract";
        e.target.style.backgroundColor = "#65737e";
        return;
    }

    else if(valueT.value != '' && data.value != '' && !valueT.disabled && !data.disabled){

        let pass = prompt("Enter password for account");
        CreateSafeContract(address,parseInt(valueT.value),data.value,pass);

        valueT.value = "";
        data.value = "";
        data.disabled = false;
        recipientD.disabled = false;
        e.target.style.display = "none";
        e.target.innerHTML = "Create Contract";
        e.target.style.backgroundColor = "#65737e";
        return;

    }

        valueT.value = "";
        valueT.disabled = false;
        data.value = "";
        data.disabled = false;
        recipientD.disabled = false;
        recipientD.value = "";
        recipientDivD.style.display = "none";
        e.target.style.display = "none";

        document.getElementById("AcceptContract").style.display = "none";
        document.getElementById("RejectContract").style.display = "none";

    document.getElementById("infoToShow").style.display = "none";

                e.target.innerHTML = "Create Contract";

                e.target.style.backgroundColor = "#65737e";

    currentContractIndex = null;
};


document.getElementById("InputRecipient").onkeypress = function(){



};

document.getElementById("InputValue").onkeyup = function(e) {


    let btn = document.getElementById("CreateContractBtn");
    let data = document.getElementById("InputData");

    if(data.value != '' && e.target.value != ''){
        btn.style.display = "block";
    }else{

        btn.style.display = "none";
    }

};

document.getElementById("InputData").onkeyup = function(e) {


    let btn = document.getElementById("CreateContractBtn");
    let valueT = document.getElementById("InputValue");

    if(valueT.value != '' && e.target.value != ''){
        btn.style.display = "block";
    }else{

        btn.style.display = "none";
    }

};



document.getElementById("InputRecipient").onkeyup = function(e) {

    let btnContract = document.getElementById("CreateContractBtn")
    if(e.target.value != ''){
        btnContract.innerHTML = "Add Recipient";

                btnContract.style.backgroundColor = "#4CAF50";
    }else{
        btnContract.innerHTML = "Create Contract";

                btnContract.style.backgroundColor = "#65737e";
    }

};

document.getElementById("AcceptContract").onclick = function(){

    contractManager = new ContractManager(address);

    let pass = prompt("Enter password");

    contractManager.acceptContract(currentContractIndex,pass);




};


document.getElementById("RejectContract").onclick = function(){

    contractManager = new ContractManager(address);


    let pass = prompt("Enter password");
    contractManager.rejectContract(currentContractIndex,pass);



};
