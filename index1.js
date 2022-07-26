const { ChainId, Fetcher, WETH, Route, Trade, TokenAmount, TradeType } = require ('@uniswap/sdk');
const ethers = require('ethers');  

//const url = 'https://eth-mainnet.g.alchemy.com/v2/Me9TM57oKMh4sMHIiLBSLgOfWG1SCqx0';
const url = 'https://api.harmony.one';
const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

const chainId = ChainId.HARMONY;
//const tokenAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
const jewelAddress = '0x72Cb10C6bfA5624dD07Ef608027E366bd690048F';
const woneAddress = '0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a';
const dfkRouter = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
const dfkFactory = new ethers.Contract('0x9014B937069918bd319f80e8B3BB4A2cf6FAA5F7', UniswapV2Factory.abi);

const init = async () => {
	//const dai = await Fetcher.fetchTokenData(chainId, tokenAddress, customHttpProvider);
	//const weth = WETH[chainId];
	//const pair = await Fetcher.fetchPairData(dai, weth, customHttpProvider);
	//const route = new Route([pair], weth);
	//const trade = new Trade(route, new TokenAmount(weth, '100000000000000000'), TradeType.EXACT_INPUT);
    const jewel = await Fetcher.fetchTokenData(chainId, jewelAddress, customHttpProvider);
    const wone = await Fetcher.fetchTokenData(chainId, woneAddress, customHttpProvider);
    const pair = await Fetcher.fetchPairData(wone, jewel, customHttpProvider);
    const route = new Route([pair], wone);
    const trade = new Trade(route, new TokenAmount(wone, '100000000000000000000'), TradeType.EXACT_INPUT);
	// console.log("Mid Price WETH --> DAI:", route.midPrice.toSignificant(6));
	// console.log("Mid Price DAI --> WETH:", route.midPrice.invert().toSignificant(6));
	// console.log("-".repeat(45));
	// console.log("Execution Price WETH --> DAI:", trade.executionPrice.toSignificant(6));
	// console.log("Mid Price after trade WETH --> DAI:", trade.nextMidPrice.toSignificant(6));
    console.log("Mid Price JEWEL --> WONE:", route.midPrice.toSignificant(6));
	console.log("Mid Price WONE --> JEWEL:", route.midPrice.invert().toSignificant(6));
	console.log("-".repeat(45));
	console.log("Execution Price WONE --> JEWEL:", trade.executionPrice.toSignificant(6));
	console.log("Mid Price after trade WONE --> JEWEL:", trade.nextMidPrice.toSignificant(6));

    // Debug.INPUT_TOKEN: {"decimals":18,"chainId":56,"address":"0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"};
    // Debug.OUTPUT_TOKEN: {"decimals":18,"chainId":56,"address":"0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"};

}

init();