pragma solidity ^0.4.4;

interface ERC223Interface {
    function transfer(address to, uint tokens, bytes data) public returns (bool);
    event Transfer(address indexed from, address indexed to, uint value, bytes data);
}
