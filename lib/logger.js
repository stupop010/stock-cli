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
        `If you are searching with multiply words, place 'quotes' around`
      );
      console.error(
        `i.e International Business Machines will become 'International Business Machines'`
      );
      console.log("\n");
      break;
    case "price":
      console.log("\n");
      console.error(`Error: ${errMessage.red}`);
      console.log("\n");
      break;
    default:
      break;
  }
};

module.exports = {
  logTable,
  logError,
};
