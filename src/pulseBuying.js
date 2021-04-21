const sharedValues = require("./sharedValues");
const placeOrder = require("./placeOrder");
const updateBalances = require("./updateBalances");
const { buyDelta, productId } = require("./settings");

async function pulseBuying(ticker) {
  const price = Number(ticker.price);
  const { lowestPriceSinceLastSell } = sharedValues;

  if (!lowestPriceSinceLastSell || price < lowestPriceSinceLastSell) {
    sharedValues.lowestPriceSinceLastSell = price;
    return;
  }

  const buyPrice = lowestPriceSinceLastSell * (1 + buyDelta);

  if (price >= buyPrice) {
    // place the buy order
    console.log(
      "Triggering buy",
      "Lowest price:",
      lowestPriceSinceLastSell,
      "Current price",
      price
    );

    sharedValues.status = "waiting";
    const order = await placeOrder({
      side: "buy",
      price,
      size: sharedValues.amountOfBaseCurrency,
      productId,
    });

    sharedValues.highestPriceSinceLastBuy = price;
    sharedValues.lastBuy = order;
    await updateBalances();
  }
}

module.exports = pulseBuying;
