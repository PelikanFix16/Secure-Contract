pragma solidity ^0.4.4;

import "./ERC223_receiving_contract.sol";



contract TradeCenter is ERC223ReceivingContract{


    mapping(address => uint) private balances;


    function tokenFallback(address _from, uint _value, bytes _data) public {


        balances[_from] += _value;
        

    }

    function getBalances(address _from) public view returns(uint){
        
        
        return balances[_from];
    }




}
