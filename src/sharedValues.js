let highestPriceSinceLastBuy = null;
let lowestPriceSinceLastSell = null;

let lastSell = null;
let lastBuy = null;

let amountOfCrypto = 0;
let amountOfBaseCurrency = 0;

let status = "buying"; // buying, selling, waiting
let profitProfileId = null;
let tradingProfileId = null;

const sharedValues = {
  highestPriceSinceLastBuy,
  lowestPriceSinceLastSell,
  lastBuy,
  lastSell,
  amountOfCrypto,
  amountOfBaseCurrency,
  status,
  tradingProfileId,
  profitProfileId,
};

module.exports = sharedValues;
