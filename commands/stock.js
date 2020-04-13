const Table = require("cli-table3");

const KeyManager = require("../lib/KeyManager");
const ApiManager = require("../lib/ApiManager");
const { checkMarket, checkArgv, getEntries } = require("../utils/index");
const APIKEY = require("../lib/constant/index");
const { logTable, logError, logSearchTable } = require("../lib/logger");

const fetchKey = () => {
  const keyManager = new KeyManager();
  const key = keyManager.get(APIKEY);
  return key;
};

const stock = {
  async fetchStock(stock) {
    try {
      const key = fetchKey();
      const apiManager = new ApiManager(key);
      const fetchStock = await apiManager.fetchStock(stock);

      const table = new Table({
        head: Object.keys(fetchStock),
        style: { head: ["yellow"] },
      });

      table.push(Object.values(fetchStock));

      logTable(table, fetchStock.symbol);
    } catch (error) {
      logError(error.message, "price");
    }
  },
  async dailyStock(stock, numOfDays) {
    const key = fetchKey;
    const apiManager = new ApiManager(key);
    const daily = await apiManager.dailyStock(stock, numOfDays);
    console.log(daily);
  },
  async searchStock(search, markets) {
    try {
      const market = checkMarket(markets);
      const key = fetchKey();
      const apiManager = new ApiManager(key);
      const searchStocks = await apiManager.searchStock(search, market);

      const table = new Table({
        head: Object.keys(searchStocks[0]),
        style: { head: ["yellow"] },
        wordWrap: true,
        colWidths: [10, 40],
      });

      searchStocks.forEach((stock) => table.push(Object.values(stock)));

      logSearchTable(table, search, market);
    } catch (error) {
      logError(error.message, "search");
    }
  },
};

module.exports = stock;
