const { ethers } = require("ethers");
const UNISWAP = require("@uniswap/sdk");
const fs = require('fs');;
const { Token, Fetcher, Route, Trade, TokenAmount, TradeType, Percent} = require("@uniswap/sdk");
const { getAddress } = require("ethers/lib/utils");
const url = 'https://api.s0.t.hmny.io/';
const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
const privateKey = fs.readFileSync(".secret").toString().trim();
const wallet = new ethers.Wallet(privateKey, customHttpProvider);

UNISWAP_ROUTER_ADDRESS = "0x24ad62502d1C652Cc7684081169D04896aC20f30";
UNISWAP_ROUTER_ABI = fs.readFileSync("./abis/router.json").toString();
UNISWAP_ROUTER_CONTRACT = new ethers.Contract(UNISWAP_ROUTER_ADDRESS, UNISWAP_ROUTER_ABI, customHttpProvider);

const jewel = new Token(
    UNISWAP.ChainId.HARMONY,
    "0x72Cb10C6bfA5624dD07Ef608027E366bd690048F",
    18
);
const wone = new Token(
    UNISWAP.ChainId.HARMONY,
    "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
    18
);


async function swapTokens(token1, token2, amount, slippage = "50") {
        const pair = await Fetcher.fetchPairData(token1, token2, customHttpProvider); //creating instances of a pair
        const route = await new Route([pair], token2); // a fully specified path from input token to output token
        console.log(pair, route);
}
swapTokens(jewel, wone, 0.01);
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
//         let reciept = (await sendTxn).wait()

//         //Logs the information about the transaction it has been mined.
//         if (reciept) {
//             console.log(" - Transaction is mined - " + '\n' 
//             + "Transaction Hash:", (await sendTxn).hash
//             + '\n' + "Block Number: " 
//             + (await reciept).blockNumber + '\n' 
//             + "Navigate to https://rinkeby.etherscan.io/txn/" 
//             + (await sendTxn).hash, "to see your transaction")
//         } else {
//             console.log("Error submitting transaction")
//         }

//     } catch(e) {
//         console.log(e)
//     }
// }

// swapTokens(jewel, wone, 0.1);