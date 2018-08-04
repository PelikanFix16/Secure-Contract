
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

    

    mapping(address => uint) private _contractsIndex;
    mapping(uint => Contract) private _contracts;
    uint private _index = 0;

    SafeCoin private _safecoin;


    address temp;

    function TradeCenter(address _safe) public{
        _safecoin = SafeCoin(_safe);

        temp = _safe;

    }

    function getTempAddr() public view returns(address){
        return temp;

    }


    function tokenFallback(address _from, uint _value, bytes _data) public {

        _contractsIndex[_from] = _index;
        _contracts[_index] = Contract(_from,address(0),_value,_value,_data,false,false,false,false);
        _index++;

    }


    function addRecipient(address _recipient) public {
        
        Contract storage contr = _contracts[_contractsIndex[msg.sender]];
        
        require(_recipient != address(0));
        require(_recipient != contr.from);
        require(contr.from != address(0));
        contr.to = _recipient;
        _contractsIndex[_recipient] = _contractsIndex[msg.sender];
    }

    function acceptContract() public returns(bool){
    
        Contract storage contr = _contracts[_contractsIndex[msg.sender]];

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
            if(_safecoin.transfer(contr.to,contr.tokens)){
                contr.historyTokens = 0;
                return true;
            }
            
        }

        return false;
        
    }

    function rejectContract() public returns(bool){
        Contract storage contr = _contracts[_contractsIndex[msg.sender]];

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
            if(_safecoin.transfer(contr.from,contr.tokens)){
                contr.historyTokens = 0;
                return true;
            }
        }

        return false;


    }

    function getReject() public view returns(bool){
        Contract memory contr = _contracts[_contractsIndex[msg.sender]];

        require(contr.from != address(0));
        require(contr.to != address(0));
        
        if(msg.sender == contr.from){
            return contr.creatorReject;
        }
        else if(msg.sender == contr.to){
            return contr.recipientReject;
        }


    }

    function getAcceptation() public view returns(bool){

        Contract memory contr = _contracts[_contractsIndex[msg.sender]];

        require(contr.from != address(0));
        require(contr.to != address(0));

        if(msg.sender == contr.from){
            return contr.creator;

        }
        else if(msg.sender == contr.to){
            return contr.recipient;
        }


    }

    function getData() public view returns(bytes){
        
        Contract memory contr = _contracts[_contractsIndex[msg.sender]];
        require(contr.from != address(0));
        require(contr.to != address(0));

        return contr.data;

    }

    function getTokens() public view returns(uint){
        
        Contract memory contr = _contracts[_contractsIndex[msg.sender]];
        require(contr.from != address(0));
        require(contr.to != address(0));

        return contr.tokens;

    }





}

