// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Token {
  string public name = "My Test Token";
  string public symbol = "MTT";
  uint public totalSupply = 1000000000;
  address public owner;
  mapping(address => uint) balances;

  constructor() {
    balances[msg.sender] = totalSupply;
    owner = msg.sender;
  }

  function transfer(address to, uint amount) external {
    require(balances[msg.sender] >= amount, "Not enough tokens");
    balances[msg.sender] -= amount;
    balances[to] += amount;
  }

  function balanceOf(address account) external view returns(uint) {
    return balances[account];
  }
}