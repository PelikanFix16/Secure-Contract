pragma solidity ^0.4.4;

import "./ERC223_receiving_contract.sol";

contract TestContract is ERC223ReceivingContract {


    mapping(address => uint) public balance;

    bytes private data;

    function tokenFallback(address _from,uint _value,bytes _data) public{
        
        balance[_from] += _value;
        
        data = _data;

    }

    function getBalance(address _from) public view returns (uint){

        return balance[_from];



    }



}
