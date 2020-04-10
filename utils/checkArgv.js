const checkArgv = (argv) => {
  if (argv.length > 2) {
    throw new Error(
      `Only allowed two arguments. One for stock symbol, One for market. You have input ${argv.length} arguments`
    );
  }

  return {
    stock: argv[0],
    market: argv[1] ? argv[1] : null,
  };
};

module.exports = checkArgv;
