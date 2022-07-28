const { ChainId, Fetcher, Route, Trade, TokenAmount, TradeType, Pair, Token } = require ('@uniswap/sdk');
const ethers = require('ethers');  

const url = 'https://api.s0.t.hmny.io/';
const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

const chainId = ChainId.HARMONY;
const JEWEL = new Token(ChainId.HARMONY, '0x72Cb10C6bfA5624dD07Ef608027E366bd690048F', 18, 'JEWEL', 'Jewel Token');
const WONE = new Token(ChainId.HARMONY, '0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a', 18, 'WONE', 'Wrapped ONE Token');
const SHVAS = new Token(ChainId.HARMONY, '0x66F5BfD910cd83d3766c4B39d13730C911b2D286', 0, 'DFKSHVAS', "Shvas Rune");
const jewelWonePairAddress = '0xEb579ddcD49A7beb3f205c9fF6006Bb6390F138f';
const dfkRouterAddress = '0x24ad62502d1C652Cc7684081169D04896aC20f30';
const ABI = require('./UniswapV2Router02.json');


const pair = new Pair(new TokenAmount(SHVAS, '1000000000000000000'), new TokenAmount(JEWEL, '1000000000000000000'));
// console.log(pair);
const route = new Route([pair], JEWEL);
// console.log(route);
const trade = new Trade(route, new TokenAmount(JEWEL, '1000000000000000000'), TradeType.EXACT_INPUT);
console.log(trade);
console.log("-".repeat(60));
console.log("Mid Price JEWEL --> SHVAS:", route.midPrice.toSignificant(6));
console.log("Mid Price SHVAS --> JEWEL:", route.midPrice.invert().toSignificant(6));
console.log("-".repeat(60));
console.log("Execution Price JEWEL --> SHVAS:", trade.executionPrice.toSignificant(6));
console.log("Mid Price after trade SHVAS --> JEWEL:", trade.nextMidPrice.toSignificant(6));
console.log("-".repeat(60));


// const jewelWonePair = async () => {
//     const pairAddress = Pair.getAddress(JEWEL, WONE)
  
//     const reserves = [
//       pairAddress
//     ]
//     const [reserve0, reserve1] = reserves
  
//     const tokens = [JEWEL, WONE]
//     const [token0, token1] = tokens[0].sortsBefore(tokens[1]) ? tokens : [tokens[1], tokens[0]]
  
//     const pair = new Pair(new TokenAmount(token0, reserve0), new TokenAmount(token1, reserve1))
//     return pair
//   }

// jewelWonePair();


// const init = async () => {
//     const jewel = await Fetcher.fetchTokenData(chainId, jewelAddress, customHttpProvider);
//     const wone = await Fetcher.fetchTokenData(chainId, woneAddress, customHttpProvider);
//     const shvas = await Fetcher.fetchTokenData(chainId, shvasAddress, customHttpProvider);
//     console.log(jewel, wone, shvas);



    // const pair = await Fetcher.fetchPairData(wone, jewel, customHttpProvider);



//     // const jewelwone = new ethers.Contract(
//     //     dfkRouter,
//     //     ['function swapTokensForExactTokens(uint256,uint256,address[],address,uint256)'],
//     //     customHttpProvider);
//     // console.log(jewelwone);
    
//     // const tx = await jewelwone.swapTokensforExactTokens(
//     //     ethers.utils.parseUnits('1', 18)
//     // );


//     // const uniswap = new ethers.Contract(dfkRouter, #####ABI#####, customHttpProvider);
//     // console.log(uniswap);

//     // const pair = await Fetcher.fetchPairData(wone, jewel, customHttpProvider);
//     // const route = new Route([pair], wone);
//     // const trade = new Trade(route, new TokenAmount(wone, '100000000000000000000'), TradeType.EXACT_INPUT);
//     // console.log(jewel, wone, pair, route, trade);
//     // console.log("Mid Price JEWEL --> WONE:", route.midPrice.toSignificant(6));
// 	// console.log("Mid Price WONE --> JEWEL:", route.midPrice.invert().toSignificant(6));
// 	// console.log("-".repeat(45));
// 	// console.log("Execution Price WONE --> JEWEL:", trade.executionPrice.toSignificant(6));
// 	// console.log("Mid Price after trade WONE --> JEWEL:", trade.nextMidPrice.toSignificant(6));
// }

// init();


