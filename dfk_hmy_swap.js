const { ethers } = require("ethers");
const UNISWAP = require("@uniswap/sdk");
const fs = require('fs');
const { Token, WETH, Fetcher, Route, Trade, TokenAmount, TradeType, Percent, Pair, ChainId } = require("@uniswap/sdk");
const { getAddress } = require("ethers/lib/utils");
// const { getPair } = require("./node_modules/@uniswap/v2-core/contracts/UniswapV2Factory.sol");

const url = 'https://api.s0.t.hmny.io/';
const provider = new ethers.providers.JsonRpcProvider(url);

const privateKey = fs.readFileSync(".secret").toString().trim();
const wallet = new ethers.Wallet(privateKey, provider);

UNISWAP_FACTORY_ADDRESS = "0x9014B937069918bd319f80e8B3BB4A2cf6FAA5F7";
UNISWAP_ROUTER_ADDRESS = "0x24ad62502d1C652Cc7684081169D04896aC20f30";
UNISWAP_ROUTER_ABI = fs.readFileSync("./UniswapV2Router02.json").toString();
UNISWAP_FACTORY_ABI = fs.readFileSync("./UniswapV2Factory.json").toString();
UNISWAP_ROUTER_CONTRACT = new ethers.Contract(UNISWAP_ROUTER_ADDRESS, UNISWAP_ROUTER_ABI, provider);

// const DAI = new Token(
//     UNISWAP.ChainId.RINKEBY,
//     "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
//     18
// );
const JEWEL = new Token(UNISWAP.ChainId.HARMONY, '0x72Cb10C6bfA5624dD07Ef608027E366bd690048F', 18, 'JEWEL', 'Jewel Token');
const WONE = new Token(UNISWAP.ChainId.HARMONY, '0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a', 18, 'WONE', 'Wrapped ONE Token');
const SHVAS = new Token(ChainId.HARMONY, '0x66F5BfD910cd83d3766c4B39d13730C911b2D286', 0, 'DFKSHVAS', "Shvas Rune");
const jewelWonePairAddress = '0xEb579ddcD49A7beb3f205c9fF6006Bb6390F138f';
const jewelShvasPairAddress = '0xB270556714136049B27485f1aA8089B10F6F7f57';
// console.log(JEWEL,WONE);
// console.log(JEWEL,SHVAS);
// const pair = new Pair(new TokenAmount(WONE, '1000000000000000000'), new TokenAmount(JEWEL, '1000000000000000000'));
const pair = Pair.getAddress(WONE, JEWEL);
const shvaspair = Pair.getAddress(SHVAS, JEWEL);
// const pair = jewelWonePairAddress;

pairtest = UNISWAP_FACTORY_ADDRESS.getPair(WONE, JEWEL);
pair_contract = new ethers.contract(pairtest, UNISWAP_FACTORY_ABI, wallet);
reserves = pair_contract.getReserves();
console.log(reserves);
// total liquidity = (reserves[0] * usdtprice) + (reserves[1] * usdtprice)

console.log("-".repeat(60));
console.log("pulled JEWEL/WONE pair address: ", pair);
console.log("actual JEWEL/WONE pair address: ", jewelWonePairAddress);
console.log("-".repeat(60));
console.log("pulled JEWEL/DFKSHVAS pair address: ", shvaspair);
console.log("actual JEWEL/DFKSHVAS pair address: ", jewelShvasPairAddress);
console.log("-".repeat(60));
// const route = new Route([pair], WONE);
// console.log(route);
// const trade = new Trade(route, new TokenAmount(WONE, '10000000'), TradeType.EXACT_INPUT);
// console.log(trade);

// console.log("-".repeat(60));
// console.log("Mid Price JEWEL --> WONE:", route.midPrice.toSignificant(6));
// console.log("Mid Price WONE --> JEWEL:", route.midPrice.invert().toSignificant(6));
// console.log("-".repeat(60));
// console.log("Execution Price JEWEL --> WONE:", trade.executionPrice.toSignificant(6));
// console.log("Mid Price after trade WONE --> JEWEL:", trade.nextMidPrice.toSignificant(6));
// console.log("-".repeat(60));





// async function swapTokens(token1, token2, amount, slippage = "50") {


//     try {
//         const pair = await Fetcher.fetchPairData(token1, token2, provider); //creating instances of a pair
//         const route = await new Route([pair], token2); // a fully specified path from input token to output token
//         let amountIn = ethers.utils.parseEther(amount.toString()); //helper function to convert ETH to Wei
//         amountIn = amountIn.toString()
        
//         const slippageTolerance = new Percent(slippage, "10000"); // 50 bips, or 0.50% - Slippage tolerance
    
//         const trade = new Trade( //information necessary to create a swap transaction.
//                 route,
//                 new TokenAmount(token2, amountIn),
//                 TradeType.EXACT_INPUT
//         );

//         const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw; // needs to be converted to e.g. hex
//         const amountOutMinHex = ethers.BigNumber.from(amountOutMin.toString()).toHexString();
//         const path = [token2.address, token1.address]; //An array of token addresses
//         const to = wallet.address; // should be a checksummed recipient address
//         const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time
//         const value = trade.inputAmount.raw; // // needs to be converted to e.g. hex
//         const valueHex = await ethers.BigNumber.from(value.toString()).toHexString(); //convert to hex string
    
//         //Return a copy of transactionRequest, The default implementation calls checkTransaction and resolves to if it is an ENS name, adds gasPrice, nonce, gasLimit and chainId based on the related operations on Signer.
//         const rawTxn = await UNISWAP_ROUTER_CONTRACT.populateTransaction.swapExactETHForTokens(amountOutMinHex, path, to, deadline, {
//             value: valueHex
//         })
    
//         //Returns a Promise which resolves to the transaction.
//         let sendTxn = (await wallet).sendTransaction(rawTxn)
        

//         //Resolves to the TransactionReceipt once the transaction has been included in the chain for x confirms blocks.
//         let receipt = (await sendTxn).wait()

//         //Logs the information about the transaction it has been mined.
//         if (receipt) {
//             console.log(" - Transaction is mined - " + '\n' 
//             + "Transaction Hash:", (await sendTxn).hash
//             + '\n' + "Block Number: " 
//             + (await receipt).blockNumber + '\n' 
//             + "Navigate to https://explorer.harmony.one/tx/" 
//             + (await sendTxn).hash, "to see your transaction")
//         } else {
//             console.log("Error submitting transaction")
//         }

//     } catch(e) {
//         console.log(e)
//     }
// }
// swapTokens(WONE, JEWEL, .001) //first argument = token we want, second = token we have, the amount we want