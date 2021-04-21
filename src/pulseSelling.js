const sharedValues = require("./sharedValues");
const placeOrder = require("./placeOrder");
const updateBalances = require("./updateBalances");
const client = require("./client");
const {
  sellDelta,
  productId,
  profitPercentage,
  baseCurrency,
} = require("./settings");

async function pulseSelling(ticker) {
  const price = Number(ticker.price);
  const {
    highestPriceSinceLastBuy,
    tradingProfileId,
    profitProfileId,
  } = sharedValues;

  if (!highestPriceSinceLastBuy || highestPriceSinceLastBuy < price) {
    sharedValues.highestPriceSinceLastBuy = price;
    return;
  }

  const sellPrice = highestPriceSinceLastBuy * (1 - sellDelta);

  if (price <= sellPrice) {
    console.log(
      "Triggering sell",
      "Highest price:",
      highestPriceSinceLastBuy,
      "Current price",
      price
    );

    sharedValues.status = "waiting";

    const order = await placeOrder({
      side: "sell",
      price,
      size: sharedValues.amountOfCrypto.toFixed(6),
      productId,
    });

    sharedValues.lowestPriceSinceLastSell = price;
    sharedValues.lastSell = order;

    if (sharedValues.lastBuy) {
      const gain =
        Number(sharedValues.lastBuy.executed_value) -
        Number(order.executed_value);

      if (gain > 0) {
        // Move the profits to another profile
        const amountToMove = (gain * profitPercentage).toFixed(2);
        await client.rest.profile.transferFunds({
          from: tradingProfileId,
          to: profitProfileId,
          currency: baseCurrency,
          amount: amountToMove,
        });
        console.log("Moved", amountToMove, " to profit portfolio");
      }
    }

    await updateBalances();
  }
}

module.exports = pulseSelling;
