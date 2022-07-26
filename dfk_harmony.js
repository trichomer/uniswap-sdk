const { ChainId, Fetcher, Route, Trade, TokenAmount, TradeType } = require ('@uniswap/sdk');
const ethers = require('ethers');  

const url = 'https://api.harmony.one';
const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

const chainId = ChainId.HARMONY;
const jewelAddress = '0x72Cb10C6bfA5624dD07Ef608027E366bd690048F';
const woneAddress = '0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a';
const dfkRouter = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

const init = async () => {
    const jewel = await Fetcher.fetchTokenData(chainId, jewelAddress, customHttpProvider);
    const wone = await Fetcher.fetchTokenData(chainId, woneAddress, customHttpProvider);
    const pair = await Fetcher.fetchPairData(wone, jewel, customHttpProvider);
    const route = new Route([pair], wone);
    const trade = new Trade(route, new TokenAmount(wone, '100000000000000000000'), TradeType.EXACT_INPUT);
    console.log("Mid Price JEWEL --> WONE:", route.midPrice.toSignificant(6));
	console.log("Mid Price WONE --> JEWEL:", route.midPrice.invert().toSignificant(6));
	console.log("-".repeat(45));
	console.log("Execution Price WONE --> JEWEL:", trade.executionPrice.toSignificant(6));
	console.log("Mid Price after trade WONE --> JEWEL:", trade.nextMidPrice.toSignificant(6));
}

init();