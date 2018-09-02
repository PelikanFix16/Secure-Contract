

pragma solidity ^0.4.4;

import "./ERC223_receiving_contract.sol";
import "./SafeCoin.sol";


contract TradeCenter is ERC223ReceivingContract{





    struct Contract {
        
        address from;
        address to;
        uint tokens;
        uint historyTokens;
        bytes data;
        bool creator;
        bool recipient;
        bool creatorReject;
        bool recipientReject;

    }

    

    //mapping(address => uint) private _contractsIndex;
    //mapping(uint => Contract) private _contracts;
    
    mapping(address => uint[]) private _contractsIndex;
    mapping(uint => Contract) private _contracts;
    uint private _current = 0;
    
    SafeCoin private _safecoin;



    function TradeCenter(address _safe) public{
        _safecoin = SafeCoin(_safe);


    }



    function tokenFallback(address _from, uint _value, bytes _data) public {

        _contractsIndex[_from].push(_current);
        _contracts[_current] = Contract(_from,address(0),_value,_value,_data,false,false,false,false);
        _current++;
    
    }

    function checkIndexAvailable(address _sender,uint _index) private view returns(bool) {
        uint _listIndexLength = _contractsIndex[_sender].length;
        if(_listIndexLength == 0){
            return false;
        }

        for(uint i=0;i<_listIndexLength;i++){
            if(_contractsIndex[_sender][i] == _index){
                return true;
            }
        }
        return false;
        
    }

    function contractAvailable(uint _index) public view returns(bool){
        
        require(checkIndexAvailable(msg.sender,_index));

        Contract memory contr = _contracts[_index];

        require(contr.from != address(0));
        require(contr.to != address(0));

        if(contr.historyTokens>0){
            return true;
        }
        return false;


    }


    function getAvailableIndex() public view returns(uint[]) {
        return _contractsIndex[msg.sender];
    }


    function addRecipient(address _recipient,uint _index) public {
        
        //  #1 Dodanie odbiorcy pod pierwszy kontrakt ktory go nie posiada
        //  #2 Reczne wybranie konraktu ktory ma miec danego odbiorce
        //  #3 Zmiana interfejsu z tokenFallbackiem aby dodatkowo przyjmowal address odbiorcy
        require(checkIndexAvailable(msg.sender,_index));

        Contract storage contr = _contracts[_index];

        require(_recipient != address(0));
        require(_recipient != contr.from);
        require(contr.from != address(0));
        contr.to = _recipient;
        _contractsIndex[_recipient].push(_index);
    }

    function acceptContract(uint _index) public returns(bool){
        
        require(checkIndexAvailable(msg.sender,_index));

        Contract storage contr = _contracts[_index];

        require(contr.from != address(0));
        require(contr.to != address(0));
        require(contr.historyTokens>0);

        if(msg.sender == contr.from){
            contr.creator = !contr.creator;
            contr.creatorReject = false;
        }

        else if(msg.sender == contr.to){
            contr.recipient = !contr.recipient;
            contr.recipientReject = false;
        }

        
        if(contr.creator && contr.recipient){
                contr.historyTokens = 0;
            if(_safecoin.transfer(contr.to,contr.tokens)){
                return true;
            }else{
                contr.historyTokens = contr.tokens;
            }
            
        }

        return false;
        
    }

    function rejectContract(uint _index) public returns(bool){
        
        require(checkIndexAvailable(msg.sender,_index));

        Contract storage contr = _contracts[_index];

        require(contr.from != address(0));
        require(contr.to != address(0));
        require(contr.historyTokens>0);
        
        if(msg.sender == contr.from){
            contr.creatorReject = !contr.creatorReject;
            contr.creator = false;
        }
        
        else if(msg.sender == contr.to){
            contr.recipientReject = !contr.recipientReject;
            contr.recipient = false;
        }
        if(contr.creatorReject && contr.recipientReject){
                contr.historyTokens = 0;
            if(_safecoin.transfer(contr.from,contr.tokens)){
                return true;
            }else{
                contr.historyTokens = contr.tokens;
            }
        }

        return false;


    }

    function getReject(uint _index) public view returns(bool){
        
        require(checkIndexAvailable(msg.sender,_index));

        Contract memory contr = _contracts[_index];

        require(contr.from != address(0));
        require(contr.to != address(0));
        
        if(msg.sender == contr.from){
            return contr.creatorReject;
        }
        else if(msg.sender == contr.to){
            return contr.recipientReject;
        }


    }

    function getAcceptation(uint _index) public view returns(bool){

        require(checkIndexAvailable(msg.sender,_index));

        Contract memory contr = _contracts[_index];

        require(contr.from != address(0));
        require(contr.to != address(0));

        if(msg.sender == contr.from){
            return contr.creator;

        }
        else if(msg.sender == contr.to){
            return contr.recipient;
        }


    }

    function getData(uint _index) public view returns(bytes){
        
        require(checkIndexAvailable(msg.sender,_index));

        Contract memory contr = _contracts[_index];

        return contr.data;

    }

    function getTokens(uint _index) public view returns(uint){

        require(checkIndexAvailable(msg.sender,_index));

        Contract memory contr = _contracts[_index];

        return contr.tokens;

    }

    function getCreator(uint _index) public view returns(address){
        
        require(checkIndexAvailable(msg.sender,_index));

        Contract memory contr = _contracts[_index];
      
        require(contr.from != address(0));
        require(contr.to != address(0));

        return contr.from;
    }

    


    function getRecipient(uint _index) public view returns(address){
        
        require(checkIndexAvailable(msg.sender,_index));

        Contract memory contr = _contracts[_index];
      
        require(contr.from != address(0));
        require(contr.to != address(0));

        return contr.to;
    }



}

