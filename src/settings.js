const crypto = process.env.CRYPTO || "XLM";
const baseCurrency = process.env.CURRENCY || "USD";
const profitProfile = process.env.PROFIT_PROFILE || "default";
const tradingProfile = process.env.TRADING_PROFILE || "trading-bot";
const profitPercentage = Number(process.env.PROFIT_PERCENTAGE) || 0.75;
const sellDelta = Number(process.env.SELL_DELTA) || 0.02;
const buyDelta = Number(process.env.BUY_DELTA) || 0.02;
const minimumBalance = Number(process.env.MINIMUM_BALANCE) || 5;

const productId = crypto + "-" + baseCurrency;

module.exports = {
  crypto,
  baseCurrency,
  profitPercentage,
  tradingProfile,
  profitProfile,
  sellDelta,
  buyDelta,
  productId,
  minimumBalance,
};
