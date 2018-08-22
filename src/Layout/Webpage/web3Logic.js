

const SafeCoinAddress = "0xb09adabd2473e8c5ef0ce8e562939834ae69adcc";
const tradecenterAddress = "0x9897ca5057791f51a4b490a1b46c0b4335d0a829";

var netId = 3;
var temp_array = [];
var currentContractIndex = null;
var privateKeyEx = null;
var lastSelect = [];
var isCurrentArray = [];
var isHisArray = [];

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

if(localStorage["file1"] !== undefined){
    fileOb = JSON.parse(localStorage["file1"]);

}

if(localStorage["key1"] !== undefined){
    privateKeyEx = localStorage["key1"];


}

console.log(localStorage["key1"]);
console.log(localStorage["file1"]);

if(typeof web3 !== 'undefined'){

    web3 = new Web3(web3.currentProvider);

}else{
    //TODO change Http provider to mainnet

    web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/51d43a660b604b768089a4483a2b0f31"));


}
    //main account[0] only for tests


    var tokenContract = new web3.eth.Contract([
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
    ],SafeCoinAddress);


    var tradeCenter = new web3.eth.Contract(
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
    ,tradecenterAddress);



class ContractManager {


    constructor(adr) {
        this.mainAdr = adr;

    }


    async getAllContract() {

        let contractIndex = await tradeCenter.methods.getAvailableIndex().call({from:this.mainAdr});

        let arr = [];
        for(let i=0;i<contractIndex.length;i++){
            arr.push(contractIndex[i]);

        }


        return arr;


    }

    async biggestNumber(index) {

        let contra = await this.getAllContract();

        if(index > Math.max(contra)){
            throw "Index is to big";
        }

    }

    async getRecipientContract(index) {

        await this.biggestNumber(index);
        try{
        let s =  await tradeCenter.methods.getRecipient(index).call({from:this.mainAdr});
        return s;
        }catch(e) {
           return "0x";
        }
    }
    async getCreatorContract(index) {
        await this.biggestNumber(index);
        return tradeCenter.methods.getCreator(index).call({from:this.mainAdr});

    }

    async getAcceptation(index,adr) {

        await this.biggestNumber(index);
        if(!web3.utils.isAddress(adr)){
            throw Error("Inncorect address");

        }
        return await tradeCenter.methods.getAcceptation(index).call({from:adr});


    }

    async getReject(index,adr) {
        await this.biggestNumber(index);
        if(!web3.utils.isAddress(adr)){
            throw Error("Inncorect address");
        }
        return await tradeCenter.methods.getReject(index).call({from:adr});


    }

    async isHistory(index) {

        await this.biggestNumber(index);

        let recipient = await this.getRecipientContract(index);

        let creator = await this.getCreatorContract(index);

        let rec1 = await this.getAcceptation(index,creator);
        let rec2 = await this.getAcceptation(index,recipient);
        let rec3 = await this.getReject(index,creator);
        let rec4 = await this.getReject(index,recipient);

        if(rec1 && rec2){

            return true;

        }

        if(rec3 && rec4){
            return true;
        }
        return false;

    }

    async createContract(_tokens,_data,password) {



        if(fileOb === null && privateKeyEx === null){
            throw "No load file to get private key";
        }
        if(typeof _tokens !== 'string'){
            throw "Parametr is not string";
        }
        if(typeof _data !== 'string'){
            throw "Parametr is not string";
        }
        if(typeof _password !== 'string' && privateKeyEx === null){
            throw "Password is not stirng";
        }
        if(_data == ""){
            throw "No Info data";
        }


        let tokens = new web3.utils.BN(web3.utils.toWei(_tokens,'ether'));
        let dataC = web3.utils.fromAscii(_data);
        let count = await web3.eth.getTransactionCount(this.mainAdr);

        let data = await tokenContract.methods.transfer(tradecenterAddress,tokens,dataC).encodeABI();

        let gasPrice = await web3.eth.getGasPrice();

        let gasL = await web3.eth.estimateGas({to:this.mainAdr,data:data,from:tradecenterAddress});

        let t = await web3.eth.getBlock("latest");


        let rawTransaction = {

            from:this.mainAdr,
            nonce:"0x"+count.toString(16),
            gasPrice: gasPrice*2,
            gasLimit: gasL*10,
            to:SafeCoinAddress,
            value:"0x0",
            data:data,
            chainId:netId

        };
        let tx = new window.ethereumjs.Tx(rawTransaction);

        if(fileOb != null && password != null){

            let privateKey = window.keythereum.recover(password,fileOb);
            privateKey = privateKey.toString('hex');

            let buf = Buffer.Buffer.from(privateKey,'hex');
            tx.sign(buf);
            let serializedTx = tx.serialize();
            let recipt = await web3.eth.sendSignedTransaction('0x'+serializedTx.toString('hex'));
            return;

        }
        if(privateKeyEx != null){

            let buf = Buffer.Buffer.from(privateKeyEx,'hex');
            tx.sign(buf);
            let serializedTx = tx.serialize();
            let recipt = await web3.eth.sendSignedTransaction('0x'+serializedTx.toString('hex'));

            return;

        }

        throw Error("No key load");




    }

    async addRecipient(addressRec,index,password){

        await this.biggestNumber(index);
        if(!web3.utils.isAddress(addressRec)){
            throw Error( "Inncorect address");
        }
        if(fileOb == null && privateKeyEx == null){

            throw Error("No load file to get private key");

        }

        let count = await web3.eth.getTransactionCount(this.mainAdr);

        let data = await tradeCenter.methods.addRecipient(addressRec,index).encodeABI({from:this.mainAdr});


        let gasL = await web3.eth.estimateGas({to:this.mainAdr,data:data,from:tradecenterAddress});

        let gasPrice = await web3.eth.getGasPrice();


        let rawTransaction = {

            from:this.mainAdr,
            nonce:"0x"+count.toString(16),
            gasLimit: gasL*10,
            gasPrice:gasPrice*2,
            to:tradecenterAddress,
            value:"0x0",
            data:data,
            chainId:netId

        };
        let tx = new window.ethereumjs.Tx(rawTransaction);

        if(fileOb != null && password != null){

            let privateKey = window.keythereum.recover(password,fileOb);
            privateKey = privateKey.toString('hex');

            let buf = Buffer.Buffer.from(privateKey,'hex');
            tx.sign(buf);
            let serializedTx = tx.serialize();
            let recipt = await web3.eth.sendSignedTransaction('0x'+serializedTx.toString('hex'));
            return;

        }
        if(privateKeyEx != null){

            let buf = Buffer.Buffer.from(privateKeyEx,'hex');
            tx.sign(buf);
            let serializedTx = tx.serialize();
            let recipt = await web3.eth.sendSignedTransaction('0x'+serializedTx.toString('hex'));

            return;

        }

        throw Error("No key load");


    }

    async acceptContract(index,password) {

        await this.biggestNumber(index);

        if(fileOb == null && privateKeyEx == null){

            throw Error("No load file to get private key");

        }

        let count = await web3.eth.getTransactionCount(this.mainAdr);
        let data = await tradeCenter.methods.acceptContract(index).encodeABI({from:this.mainAdr});
        let gasL = await web3.eth.estimateGas({to:this.mainAdr,data:data,from:tradecenterAddress});
        let gasPrice = await web3.eth.getGasPrice();

        let rawTransaction = {

            from:this.mainAdr,
            nonce:"0x"+count.toString(16),
            gasLimit: gasL*10,
            gasPrice:gasPrice*2,
            to:tradecenterAddress,
            value:"0x0",
            data:data,
            chainId:netId

        };

        let tx = new window.ethereumjs.Tx(rawTransaction);

        if(fileOb != null && password != null){

            let privateKey = window.keythereum.recover(password,fileOb);
            privateKey = privateKey.toString('hex');

            let buf = Buffer.Buffer.from(privateKey,'hex');
            tx.sign(buf);
            let serializedTx = tx.serialize();
            let recipt = await web3.eth.sendSignedTransaction('0x'+serializedTx.toString('hex'));
            return;

        }
        if(privateKeyEx != null){

            let buf = Buffer.Buffer.from(privateKeyEx,'hex');
            tx.sign(buf);
            let serializedTx = tx.serialize();
            let recipt = await web3.eth.sendSignedTransaction('0x'+serializedTx.toString('hex'));

            return;

        }

        throw Error("No key load");

    }

    async rejectContract(index,password) {

        await this.biggestNumber(index);

        if(fileOb == null && privateKeyEx == null){

            throw Error("No load file to get private key");

        }

        let count = await web3.eth.getTransactionCount(this.mainAdr);
        let data = await tradeCenter.methods.rejectContract(index).encodeABI({from:this.mainAdr});
        let gasL = await web3.eth.estimateGas({to:this.mainAdr,data:data,from:tradecenterAddress});
        let gasPrice = await web3.eth.getGasPrice();

        let rawTransaction = {

            from:this.mainAdr,
            nonce:"0x"+count.toString(16),
            gasLimit: gasL*10,
            gasPrice:gasPrice*2,
            to:tradecenterAddress,
            value:"0x0",
            data:data,
            chainId:netId

        };

        let tx = new window.ethereumjs.Tx(rawTransaction);

        if(fileOb != null && password != null){

            let privateKey = window.keythereum.recover(password,fileOb);
            privateKey = privateKey.toString('hex');

            let buf = Buffer.Buffer.from(privateKey,'hex');
            tx.sign(buf);
            let serializedTx = tx.serialize();
            let recipt = await web3.eth.sendSignedTransaction('0x'+serializedTx.toString('hex'));
            return;

        }
        if(privateKeyEx != null){

            let buf = Buffer.Buffer.from(privateKeyEx,'hex');
            tx.sign(buf);
            let serializedTx = tx.serialize();
            let recipt = await web3.eth.sendSignedTransaction('0x'+serializedTx.toString('hex'));

            return;

        }

        throw Error("No key load");



    }



    async getDataContract(index) {

        await this.biggestNumber(index);

        let data = await tradeCenter.methods.getData(index).call({from:this.mainAdr});

        return web3.utils.toAscii(data);



    }

    async getTokensContract(index) {

        await this.biggestNumber(index);
        let tokens = await tradeCenter.methods.getTokens(index).call({from:this.mainAdr});
        return web3.utils.fromWei(tokens);

    }







};

async function generateInfo(contractM,index) {

    let cre = await contractM.getCreatorContract(index);

    let data = await contractM.getDataContract(index);

    if(contractM.mainAdr.toLowerCase() == cre.toLowerCase()){

        let rec = await contractM.getRecipientContract(index);
        return "Recipient:"+rec.substring(0,lenghtAddress)+"<br>"+"Info:"+data;


    }else {

        return "Creator:"+cre.substring(0,lenghtAddress)+"<br>"+"Info:"+data;

    }




}

async function recipientCreatorSetter(contractM,index,text,inputChange,ledCre,ledRe){

    let cre = await contractM.getCreatorContract(index);
    let rec = await contractM.getRecipientContract(index);
    let acCre = await contractM.getAcceptation(index,cre);
    let acRec = await contractM.getAcceptation(index,rec);
    let reCre = await contractM.getReject(index,cre);
    let reRec = await contractM.getReject(index,rec);

    if(contractM.mainAdr.toLowerCase() == cre.toLowerCase()){
        text.innerHTML = "Recipient:";
        inputChange.value = rec;

    }else {

        text.innerHTML = "Creator:";
        inputChange.value = cre;

    }

    if(acCre){
        ledCre[0].style.backgroundColor = "#ccffcc";
    }else {
        ledCre[0].style.backgroundColor = "#ffcccc";
    }
    if(acRec){

        ledRe[0].style.backgroundColor = "#ccffcc";

    }else {

        ledRe[0].style.backgroundColor = "#ffcccc";

    }

    if(reCre){

        ledCre[1].style.backgroundColor = "#ccffcc";
    }else{

        ledCre[1].style.backgroundColor = "#ffcccc";
    }
    if(reRec){

        ledRe[1].style.backgroundColor = "#ccffcc";


    }else {

        ledRe[1].style.backgroundColor = "#ffcccc";
    }


}


async function loadToPage(){

    contractManager = new ContractManager(address);

    let contractIndexArray = await contractManager.getAllContract();


    let currentCol = document.getElementById("CurrentContract");

    let historyCol = document.getElementById("HistoryContract");



    let valueT          = document.getElementById("InputValue");
    let data            = document.getElementById("InputData");
    let recipientD      = document.getElementById("InputRecipient");
    let btnContract     = document.getElementById("CreateContractBtn")
    let recipientDivD   = document.getElementById("addRecipientDiv");
    let acButton        = document.getElementById("AcceptContract");
    let reButton        = document.getElementById("RejectContract");

    let ledCreatorAc    = document.getElementById("CreatorInfoAceLed");
    let ledRecipieAc    = document.getElementById("RecipientInfoAceLed");
    let recText         = document.getElementById("Recipient");

    let ledCreatorRe    = document.getElementById("CreatorInfoRejLed");
    let ledRecipieRe    = document.getElementById("RecipientInfoRejLed");

    let temp = false;

    if(temp_array.length != contractIndexArray.length && !temp_array.length) {
        temp_array = contractIndexArray;
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
    }else if(temp_array.length && contractIndexArray.length>temp_array.length) {

        let t = contractIndexArray;
        contractIndexArray = contractIndexArray.diff(temp_array);

        temp_array = t;

    }else if(isCurrentArray.length){
        contractIndexArray = isCurrentArray;
        isCurrentArray = [];
    }else if(isHisArray.length){
        contractIndexArray = isHisArray;
        isHisArray = [];

    }
    else {

        return;
    }



    for(let i=0;i<contractIndexArray.length;i++){


        let adr = await contractManager.getRecipientContract(contractIndexArray[i]);
        if(!web3.utils.isAddress(adr)){

            let currentDivNoRecipient = document.createElement("div");
            currentDivNoRecipient.className = "row-md-4 smallView";
            let noRecipient = document.createElement("div");
            noRecipient.className = "noRecipientSet";
            let noTextRec = document.createTextNode("No Recipient Set");
            noRecipient.appendChild(noTextRec);
            currentDivNoRecipient.appendChild(noRecipient);

            currentDivNoRecipient.id = "contractIndexR"+contractIndexArray[i];
            currentDivNoRecipient.onclick = async function(e) {

         document.getElementById("loader1").style.display = "block";
                let indexContract = contractIndexArray[i];
                let tokens = await contractManager.getTokensContract(indexContract);
                let dataCurrent = await contractManager.getDataContract(indexContract);

                valueT.value = tokens;
                valueT.disabled = true;
                data.value = dataCurrent;
                data.disabled = true;

                recipientD.disabled = false;
                recipientDivD.style.display = "block";
                btnContract.style.display = "block";
                currentContractIndex = indexContract;
                acButton.style.display = "none";
                reButton.style.display = "none";
                recText.innerHTML = "Recipient:";
                recipientD.value = "";
                document.getElementById("infoToShow").style.display = "none";

         document.getElementById("loader1").style.display = "none";

            };

            let _info = await contractManager.getDataContract(contractIndexArray[i]);

            currentDivNoRecipient.innerHTML += "Info:"+_info;
                currentCol.appendChild(currentDivNoRecipient);

            continue;
        }


        let _isHis = await contractManager.isHistory(contractIndexArray[i]);


        if(_isHis){


            let currentDivNoRecipient = document.createElement("div");
            currentDivNoRecipient.className = "row-md-4 smallView";
            currentDivNoRecipient.innerHTML = await generateInfo(contractManager,contractIndexArray[i]);
            currentDivNoRecipient.id = "contractIndex"+contractIndexArray[i];


            currentDivNoRecipient.onclick = async function() {

         document.getElementById("loader1").style.display = "block";
                let indexCurrent = contractIndexArray[i];

                let tokens = await contractManager.getTokensContract(indexCurrent);
                let dataCurrent = await contractManager.getDataContract(indexCurrent);
                await recipientCreatorSetter(contractManager,indexCurrent,recText,recipientD,[ledCreatorAc,ledCreatorRe],[ledRecipieAc,ledRecipieRe]);
                valueT.value = tokens;
                valueT.disabled = true;
                data.value = dataCurrent;
                data.disabled = true;
                recipientDivD.style.display = "block";
                btnContract.style.display = "block";
                currentContractIndex = indexCurrent;
                recipientD.disabled = true;
                acButton.style.display = "none";
                reButton.style.display = "none";
                document.getElementById("infoToShow").style.display = "block";
                btnContract.innerHTML = "Create Contract";
         document.getElementById("loader1").style.display = "none";
            };
            currentDivNoRecipient.style.backgroundColor = "#ffe6e6";
            historyCol.appendChild(currentDivNoRecipient);

        }else {

            let currentDivNoRecipient = document.createElement("div");
            currentDivNoRecipient.className = "row-md-4 smallView";
            currentDivNoRecipient.innerHTML = await generateInfo(contractManager,contractIndexArray[i]);
            currentDivNoRecipient.id = "contractIndex"+contractIndexArray[i];

            currentDivNoRecipient.onclick = async function() {
         document.getElementById("loader1").style.display = "block";
                let indexCurrent = contractIndexArray[i];
                let tokens = await contractManager.getTokensContract(indexCurrent);
                let dataCurrent = await contractManager.getDataContract(indexCurrent);
                await recipientCreatorSetter(contractManager,indexCurrent,recText,recipientD,[ledCreatorAc,ledCreatorRe],[ledRecipieAc,ledRecipieRe]);
                valueT.value = tokens;
                valueT.disabled = true;
                data.value = dataCurrent;
                data.disabled = true;
                recipientDivD.style.display = "block";
                currentContractIndex = indexCurrent;
                btnContract.style.display = "block";
                recipientD.disabled = true;
                acButton.style.display = "block";
                reButton.style.display = "block";
                document.getElementById("infoToShow").style.display = "block";
                btnContract.innerHTML = "Create Contract";
         document.getElementById("loader1").style.display = "none";

            };
            currentDivNoRecipient.style.backgroundColor = "#e6f2ff";


            currentCol.appendChild(currentDivNoRecipient);
        }

    }

}



async function loadBar(){

    address = address.replace("#","");



    let tokens = await tokenContract.methods.balanceOf(address).call();

    let balance = await web3.eth.getBalance(address);


    document.getElementById("tokensProfile").innerHTML = web3.utils.fromWei(tokens,'ether');


    document.getElementById("addressProfile").innerHTML = address;

    document.getElementById("ethProfile").innerHTML = web3.utils.fromWei(balance,'ether');





}





window.onload = async function(){


    contractManager = new ContractManager(address);

    document.getElementById("loader").style.display = "block";

    document.getElementById("AcceptContract").style.display = "none";
    document.getElementById("RejectContract").style.display = "none";

    document.getElementById("infoToShow").style.display = "none";

    await loadBar();

    await loadToPage();


    document.getElementById("loader").style.display = "none";
    setInterval(async function(){
    let uniqueArray = lastSelect.filter(function(item, pos) {
        return lastSelect.indexOf(item) == pos;
    })
        lastSelect = uniqueArray;

        for(let i=0;i<lastSelect.length;i++){
            let h = await contractManager.isHistory(lastSelect[i]);
            if(h){
                isHisArray.push(lastSelect[i]);
                document.getElementById("contractIndex"+lastSelect[i]).remove();
                delete lastSelect[i];

            }else{

                try{
                    document.getElementById("contractIndexR"+lastSelect[i]).remove();
                    isCurrentArray.push(lastSelect[i]);
                    delete lastSelect[i];
                }catch(e){



                }
            }


        }

        console.log(currentContractIndex);

    document.getElementById("loader").style.display = "block";

        await loadBar();

        await loadToPage();
try{
        document.getElementById("contractIndex"+currentContractIndex).click();
    document.getElementById("loader").style.display = "none";
}catch(e){
    document.getElementById("loader").style.display = "none";
}

    },10000);

};



document.getElementById("CreateContractBtn").onclick = async function(e){

    let valueT = document.getElementById("InputValue");
    let data = document.getElementById("InputData");
    let recipientD = document.getElementById("InputRecipient");
    let recipientDivD = document.getElementById("addRecipientDiv");

    let alert = document.getElementsByClassName("alert")[0];

    contractManager = new ContractManager(address);


     if(valueT.disabled && data.disabled && recipientD.value != '' && !recipientDivD.disabled && !recipientD.disabled) {

    lastSelect.push(currentContractIndex);

         document.getElementById("loader1").style.display = "block";
        let pass;
        if(fileOb != null){
            pass = prompt("Enter password");
        }
         try{

            if(currentContractIndex == null){
                throw "No Contract select";
            }
             await contractManager.addRecipient(recipientD.value,currentContractIndex,pass);

         }catch(e) {

            alert.style.display = "block";
            alert.innerHTML = e;
         }
        valueT.value = "";
        data.value = "";
        recipientDivD.style.display = "none";
        recipientD.value = "";
        e.target.style.display = "none";
        data.disabled = false;
        valueT.disabled = false;
        e.target.innerHTML = "Create Contract";
         e.target.style.backgroundColor = "#65737e";
         document.getElementById("loader1").style.display = "none";


         return;
    }

  else if(valueT.value != '' && data.value != '' && !valueT.disabled && !data.disabled){

         document.getElementById("loader1").style.display = "block";
    let pass;
    if(fileOb != null){
        pass = prompt("Enter password");
    }
        try{
            await contractManager.createContract(valueT.value,data.value,pass);
        }catch(e) {
            alert.style.display = "block";
            alert.innerHTML = e;
        }
        valueT.value = "";
        data.value = "";
        data.disabled = false;
        recipientD.disabled = false;
        e.target.style.display = "none";
        e.target.innerHTML = "Create Contract";
        e.target.style.backgroundColor = "#65737e";
         document.getElementById("loader1").style.display = "none";
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
document.getElementById("AcceptContract").onclick = async function(){

    lastSelect.push(currentContractIndex);
         document.getElementById("loader1").style.display = "block";
    let alert = document.getElementsByClassName("alert")[0];
    contractManager = new ContractManager(address);
    let pass;
    if(fileOb != null ){
        pass = prompt("Enter password");
    }


        try{
            await contractManager.acceptContract(currentContractIndex,pass);
        }catch(e) {
            alert.style.display = "block";
            alert.innerHTML = e;
        }


         document.getElementById("loader1").style.display = "none";
};


document.getElementById("RejectContract").onclick = async function(){

    lastSelect.push(currentContractIndex);

         document.getElementById("loader1").style.display = "block";
    let alert = document.getElementsByClassName("alert")[0];
    contractManager = new ContractManager(address);


    let pass;
    if(fileOb != null ){
        pass = prompt("Enter password");
    }

        try{
            await contractManager.rejectContract(currentContractIndex,pass);
        }catch(e) {
            alert.style.display = "block";
            alert.innerHTML = e;
        }



    document.getElementById("loader1").style.display = "none";
};

document.getElementById("LoadPrivateKey").onclick = function() {

    let val  =document.getElementById("privateKey").value;
    if(val != ''){
        privateKeyEx = val;
        console.log(val);
    }
    document.getElementById("privateKey").value = "";

    localStorage["key1"] = privateKeyEx;
};

