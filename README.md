# Ethernal ID

<p align="center">
  <img src="https://media.giphy.com/media/3o6nUYbMR3TC5glCMg/giphy.gif" />
</p>


Ethernal ID is a decentralised app that uses the Ethereum Blockchain and smart contract technology to store verifiable identities for asylum seekers and refugees.

## What is blockchain?
A blockchain is a distributed database that is shared between a network of computers or nodes. It is a digital ledger of transactions that are publicly accessible and incorruptible.

[Ethereum](https://ethereum.org/) is a blockchain-based distributed computing platform, which focuses on smart contracts.

## What is a smart contract?
A smart contract is computer code which can facilitate, execute and enforce an agreement using blockchain technology. It allows two parties to do business with one another without the need of a middleman. The contract in the case of this app is between a person seeking asylum and the local authority processing their application. 

Asylum seekers often lack any passport or proof of ID and therefore proving who they are is difficult and makes access to services like banking and supported housing hard to manage for government bodies. This app would allow local authorities to link biometric data to a person and store it on the blockchain, thus providing a safe and secure means to prove a persons ID.    

The MVP demonstrated here uses a simple interface to store a name and D.O.B., the next step would be to use store data such as a facial ID or fingerprint, which can be accessed by the owner whenever they need.

## How to run
1. Install Node.js.

2. Clone the repo to your computer.
```
git clone https://github.com/alexscotttonge/ethernal-ID
cd ethernal-ID
```

3. Install truffle testing framework and testrpc, a Node.js based Ethereum client used for development.
```
npm install -g ethereumjs-testrpc
npm install -g truffle
```

4. Install the node dependencies.
```
npm install
```

## Use app

```
npm start
```
visit `localhost:3000`

## Run tests

```
npm test
```


## Tech Stack

:computer: Ethereum

:computer: Truffle

:computer: Solidity

:computer: Web3.js

:computer: Express

:computer: Javascript

:computer: MongoDB

## Team Members
- [Ainsley Chang](https://github.com/ainsleybc)
- [Alex Scott-Tonge](https://github.com/alexscotttonge)
- [Canace Wong](https://github.com/CWongdabest)
- [Pablo Vidal](https://github.com/Pablo123GitHub)
