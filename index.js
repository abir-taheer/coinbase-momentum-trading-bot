const updateBalances = require("./src/updateBalances");
const setupWebsockets = require("./src/setupWebsockets");
const setupTradingProfiles = require("./src/setupTradingProfiles");

async function pulse() {
  await setupTradingProfiles();
  await updateBalances();
  await setupWebsockets();
}

pulse().catch(console.log);
