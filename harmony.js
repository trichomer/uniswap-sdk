const { ChainId, Fetcher, Route, Trade, TokenAmount, TradeType, Percent } = require('@uniswap/sdk');
const ethers = require('ethers');

const chainId = ChainId.HARMONY;
const jewelAddress = '0x72Cb10C6bfA5624dD07Ef608027E366bd690048F';
const woneAddress = '0xcf664087a5bb0237a0bad6742852ec6c8d69a27a';

const init = async () => {
    const jewel = await Fetcher.fetchTokenData(chainId, jewelAddress);
    const wone = await Fetcher.fetchTokenData(chainId, woneAddress);
    const pair = await Fetcher.fetchPairData(jewel, wone);
    const route = new Route([pair], wone);
    const trade = new Trade(route, new TokenAmount(wone, '1000000000000000000'), TradeType.EXACT_INPUT);
    console.log("\nWONE/JEWEL midPrice: ", route.midPrice.toSignificant(6));
    console.log("JEWEL/WONE midPrice: ", route.midPrice.invert().toSignificant(6));
    console.log("WONE/JEWEL executionPrice: ", trade.executionPrice.toSignificant(6));
    console.log("WONE/JEWEL nextMidPrice: ", trade.nextMidPrice.toSignificant(6));


}

init();