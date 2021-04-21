const sharedValues = require("./sharedValues");
const pulseBuying = require("./pulseBuying");
const pulseSelling = require("./pulseSelling");

async function tickerMessageHandler(ticker) {
  const { status } = sharedValues;

  if (status === "buying") {
    await pulseBuying(ticker);
  }

  if (status === "selling") {
    await pulseSelling(ticker);
  }
}

module.exports = tickerMessageHandler;
