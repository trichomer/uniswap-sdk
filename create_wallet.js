const ethers = require('ethers');
const wallet = ethers.Wallet.createRandom();

console.log('address: ', wallet.address);
console.log('seed phrase: ', wallet.mnemonic.phrase);
console.log('private key: ', wallet.privateKey);