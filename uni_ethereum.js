const { ChainId, Fetcher, WETH, Route, Trade, TokenAmount, TradeType, Percent } = require('@uniswap/sdk');
const ethers = require('ethers');

const chainId = ChainId.MAINNET;
const usdcAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
const wbtcAddress = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599';
  

const init = async () => {
    const usdc = await Fetcher.fetchTokenData(chainId, usdcAddress);
    const wbtc = await Fetcher.fetchTokenData(chainId, wbtcAddress);
    const pair = await Fetcher.fetchPairData(usdc, wbtc);
    const route = new Route([pair], wbtc);
    const trade = new Trade(route, new TokenAmount(wbtc, '1000000000000000000'), TradeType.EXACT_INPUT);
    console.log("\nWBTC/USDC midPrice: ", route.midPrice.toSignificant(6));
    console.log("USDC/WBTC midPrice: ", route.midPrice.invert().toSignificant(6));
    console.log("WBTC/USDC executionPrice: ", trade.executionPrice.toSignificant(6));
    console.log("WBTC/USDC nextMidPrice: ", trade.nextMidPrice.toSignificant(6));






    
    // const slippageTolerance = new Percent('50', '10000');  // 50 bps/0.5%
    // const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
    // const path = [weth.address, dai.address];
    // const to = '';
    // const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
    // const value = trade.inputAmount.raw;

    // const provider = ethers.getDefaultProvider('goerli', {
    //     infura: 'https://goerli.infura.io/v3/b71469e5cf7149458cc1eb7495a4982b'
    // });

    // const signer = new ethers.Wallet(PRIVATE_KEY);
    // const account = signer.connect(provider);
    // const uniswap = new ethers.Contract(
    //     '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    //     ['function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)'],
    //     account 
    // );
    // const tx = await uniswap.sendExactETHForTokens(
    //     amountOutMin,
    //     path,
    //     to,
    //     deadline,
    //     { value, gasPrice: 20e9 }
    // );
    // console.log(`Transaction hash: ${tx.hash}`);

    // const receipt = await tx.wait();
    // console.log(`Transaction was mined in block ${receipt.blockNumber}`);
}

init();