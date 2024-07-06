### Blockchain Technology Implementation using Ethereum

##Overview

Robust backend built with Django, featuring user functionality and virtual wallets. Technologies used:

 - Backend: Django
 - Blockchain: Ganache-Cli
 - Frontend: React
This project combines a robust Django backend with a responsive React frontend to create a seamless user experience for managing both fiat and cryptocurrencies.

##Virtual Wallet

This virtual wallet serves as a comprehensive crypto management hub, enabling users to dive into the world of cryptocurrency with ease. Within their wallets, users can seamlessly handle both fiat currencies (USD) and various cryptocurrencies. This platform empowers users to effortlessly buy, sell, and convert cryptocurrencies, providing a flexible and dynamic trading experience. Additionally, with ETH allocated for gas fees, all blockchain transactions are guaranteed to be smooth and efficient.

##Technologies used

#Web3
Utilising Web3 allows us to establish the interaction with Ethereum blockchain networks. It provides a convenient way to communicate with Ethereum nodes, send transactions, deploy contracts, and query blockchain data.Web3.js offers robust support for Ethereum's rich ecosystem, including features like event monitoring, gas estimation, and blockchain filtering.


#Blockchain Technology
Blockchain technology offers the advantage of simulating mining in testing environments, allowing immediate block addition without the computational intensity of live networks. However, in real blockchain networks, mining involves solving complex cryptographic puzzles, ensuring security through Proof of Work mechanisms. This simulation capability facilitates rapid development and testing of blockchain applications, enabling efficient iteration before deployment.

#Ganache CLI
As a local blockchain emulator, Ganache CLI provides a lightweight and customizable environment for simulating Ethereum networks locally on your development machine. With Ganache CLI, developers can rapidly iterate on their smart contracts and dApp logic in a controlled and predictable environment, without the need for deploying to a live blockchain network.

#Celery
Celery, a distributed task queue framework for Python, is used for retrieving the exchange rates for non fiat currencies in regards to the US dollar. This ensures that every transaction is as accurate as possible.

#Solidity
Solidity is a high-level programming language designed specifically for implementing smart contracts on blockchain platforms like Ethereum. Its used here to implement a few methods such as buying, selling, retrieving balance and converting currencies.

#Smart contract integration
Utilizing Truffle, the smart contract is checked and deployed. These smart contracts automate and enforce predefined rules, ensuring the integrity of transactions and the reliability of the platform. By leveraging smart contracts, users can execute transactions with confidence, knowing that their interactions are governed by transparent and immutable protocols.
