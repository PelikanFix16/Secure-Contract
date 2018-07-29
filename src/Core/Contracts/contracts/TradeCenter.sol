pragma solidity ^0.4.4;

import "./ERC223_receiving_contract.sol";



contract TradeCenter is ERC223ReceivingContract{





    struct Contract {
        
        address from;
        address to;
        uint tokens;
        bytes data;
        bool creator;
        bool recipient;

    }


    mapping(address => uint) private _contractsIndex;
    mapping(uint => Contract) private _contracts;
    uint private _index = 0;


    function tokenFallback(address _from, uint _value, bytes _data) public {

        _contractsIndex[_from] = _index;
        _contracts[_index] = Contract(_from,address(0),_value,_data,false,false);
        _index++;

    }


    function addRecipient(address _recipient) public {
        
        Contract storage contr = _contracts[_contractsIndex[msg.sender]];
        
        require(_recipient != address(0));
        require(_recipient != contr.from);
        contr.to = _recipient;
        _contractsIndex[_recipient] = _contractsIndex[msg.sender];
    }

    function acceptContract() public {
    
        Contract storage contr = _contracts[_contractsIndex[msg.sender]];

        if(msg.sender == contr.from){
            contr.creator = !contr.creator;
        }

        else if(msg.sender == contr.to){
            contr.recipient = !contr.recipient;
        }

    }

    function getAcceptation() public view returns(bool){

        Contract memory contr = _contracts[_contractsIndex[msg.sender]];

        if(msg.sender == contr.from){
            return contr.creator;

        }
        else if(msg.sender == contr.to){
            return contr.recipient;
        }


    }



}
