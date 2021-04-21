const client = require("./client");
const sharedValues = require("./sharedValues");
const { profitProfile, tradingProfile } = require("./settings");

async function setupTradingProfiles() {
  const allProfiles = await client.rest.profile.listProfiles();
  sharedValues.profitProfileId = allProfiles.find(
    (p) => p.name === profitProfile
  ).id;
  sharedValues.tradingProfileId = allProfiles.find(
    (p) => p.name === tradingProfile
  ).id;
}

module.exports = setupTradingProfiles;
