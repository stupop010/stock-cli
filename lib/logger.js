const logTimeSeriesTable = (table, stock, time) => {
  const stockSlipt = stock.split(".");
  const ifMarket = stockSlipt[1]
    ? ` in the stock market ${stockSlipt[1].blue}`.green
    : "";
  console.log("\n");
  console.log(
    `Results for `.green +
      stockSlipt[0].blue +
      ifMarket +
      ` for the last `.green +
      time.blue
  );
  console.log(table.toString());
  console.log("\n");
};

const logSearchTable = (table, search, market) => {
  const ifMarket = market ? `in the stock market `.green + market.blue : "";
  console.log("\n");
  console.log(`Best results for ${search.blue} ${ifMarket}`.green);
  console.log(table.toString());
  console.log("\n");
};

const logTable = (table, stock) => {
  console.log("\n");
  console.log(`Stock price for ${stock}`.green);
  console.log(table.toString());
  console.log("\n");
};

const logError = (errMessage, search) => {
  switch (search) {
    case "search":
      console.log("\n");
      console.error(`Error: ${errMessage.red}`);
      console.error(
        `-- If you are searching with multiply words, place 'quotes' around`
      );
      console.error(
        `-- i.e - International Business Machines - will become 'International Business Machines'`
      );
      console.log("\n");
      break;
    default:
      console.log("\n");
      console.error(`Error: ${errMessage.red}`);
      console.log("\n");
      break;
  }
};

module.exports = {
  logTable,
  logSearchTable,
  logError,
  logTimeSeriesTable,
};
