const checkArgv = (argv) => {
  if (argv.length > 2) {
    throw new Error(
      `Only allowed two arguments. One for stock symbol, One for market. You have input ${argv.length} arguments`
    );
  }

  return {
    stock: argv[0],
    market: argv[1],
  };
};

const checkMarket = (market) => {
  if (!market) return null;

  if (market.length > 1) {
    throw new Error(
      `Only allowed two arguments. One for stock symbol, One for market. You have input ${market.length} arguments`
    );
  }

  return market[0];
};

const checkTimeEntries = (time) => {
  if (!time) throw new Error("Second argument is needed");
  if (!Number(time)) throw new Error("Second argument needs to be a number");
};

module.exports = { checkArgv, checkMarket, checkTimeEntries };
