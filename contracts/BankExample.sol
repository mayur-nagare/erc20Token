// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract BankExample{
    uint8 private clientCount;
    mapping (address => uint) private balances;
    address public owner;

    event LogDepositMade(address indexed accountAdd, uint amount);

    constructor() public payable{
        require(msg.value == 2000000, "Intial amount should be 2000000 Wei");
        owner = msg.sender;
        clientCount = 0;
    }

    function addAcc() public returns (uint){
        clientCount += 1;
        balances[msg.sender] = 10 ether;

        return balances[msg.sender];
    }

    function deposit() public payable returns (uint) {
        balances[msg.sender] += msg.value;
        emit LogDepositMade(msg.sender, msg.value);
        return balances[msg.sender];
    }

    function withdraw(uint withdrawAmount) public returns (uint remainingBal) {
        // Check enough balance available, otherwise just return balance
        if (withdrawAmount <= balances[msg.sender]) {
            balances[msg.sender] -= withdrawAmount;
            payable(msg.sender).transfer(withdrawAmount);
        }
        return balances[msg.sender];
    }

    function balance() public view returns (uint) {
        return balances[msg.sender];
    }


    function depositsBalance() public view returns (uint) {
        return address(this).balance;
    }
}
