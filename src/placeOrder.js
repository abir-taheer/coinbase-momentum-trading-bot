const client = require("./client");
const sleep = require("./sleep");

// Places a limit order at the specified price
async function placeOrder({ price, side, size, productId = "LTC-USD" }) {
  let order = await client.rest.order.placeOrder({
    // price,
    size,
    product_id: productId,
    side,
    type: "market",
  });

  let secondsWaited = 0;

  while (!order.settled && secondsWaited < 10) {
    order = await client.rest.order.getOrder(order.id);

    if (order.status === "pending") {
      await sleep(1000);
      secondsWaited++;
    }
  }

  return order;
}

module.exports = placeOrder;
