// SPDX-License-Identifier: MIT 

pragma solidity 0.8.19;

contract Wallet {
    address public owner;
    mapping(address => mapping(string => uint256)) balances;

    constructor() {
        owner = msg.sender;
    }

    function deposit(string memory currency, uint256 amount) public {
        balances[msg.sender][currency] += amount;
    }

    function transfer(address to, string memory currency, uint256 amount) public {
        require(balances[msg.sender][currency] >= amount, "Insufficient balance");
        balances[msg.sender][currency] -= amount;
        balances[to][currency] += amount;
    }

    function getBalance(address user, string memory currency) public view returns (uint256) {
        return balances[user][currency];
    }

    function convertCurrency(string memory sourceCurrency, string memory targetCurrency, uint256 amount, uint256 rateToUSD, uint256 rateFromUSD) public {
        require(balances[msg.sender][sourceCurrency] >= amount, "Insufficient balance");
        uint256 usdAmount = (amount * rateToUSD) / 1e18;  // Convert to USD
        uint256 targetAmount = (usdAmount * rateFromUSD) / 1e18;  // Convert from USD to target currency
        balances[msg.sender][sourceCurrency] -= amount;
        balances[msg.sender][targetCurrency] += targetAmount;
    }
}
