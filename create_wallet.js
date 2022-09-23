import { Wallet } from 'ethers';
const wallet = Wallet.createRandom();

console.log('address: ', wallet.address);
console.log('seed phrase: ', wallet.mnemonic.phrase);
console.log('private key: ', wallet.privateKey);