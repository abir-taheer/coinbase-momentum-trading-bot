const client = require("./client");
const sharedConstants = require("./sharedValues");
const {
  baseCurrency,
  crypto,
  minimumBalance,
} = require("./settings");

async function updateBalances() {
  const accounts = await client.rest.account.listAccounts();
  sharedConstants.amountOfCrypto = Number(
    accounts.find((a) => a.currency === crypto).balance
  );

  sharedConstants.amountOfBaseCurrency =
    Number(accounts.find((a) => a.currency === baseCurrency).balance) -
    minimumBalance;

  sharedConstants.status =
    sharedConstants.amountOfCrypto > sharedConstants.amountOfBaseCurrency
      ? "selling"
      : "buying";

  console.log(
    sharedConstants.status === "buying"
      ? "More fiat than crypto, in buying mode"
      : "More crypto than fiat, in selling mode"
  );
}

module.exports = updateBalances;
