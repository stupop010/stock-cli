var colors = require("colors/safe");
const Table = require("cli-table3");

const KeyManager = require("../lib/KeyManager");
const ApiManager = require("../lib/ApiManager");
const checkMarket = require("../utils/checkMarket");
const APIKEY = require("../lib/constant/index");
const { logTable, logError } = require("../lib/logger");

const fetchKey = () => {
  const keyManager = new KeyManager();
  const key = keyManager.get(APIKEY);
  return key;
};

const apiCheck = {
  async fetchPrice(stock, markets) {
    try {
      const market = checkMarket(markets);
      const key = fetchKey();
      const apiManager = new ApiManager(key);
      const fetchStock = await apiManager.fetchPrice(stock, market);

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
  async searchStock(search, markets) {
    try {
      const market = checkMarket(markets);
      const key = fetchKey();
      const apiManager = new ApiManager(key);
      const searchStocks = await apiManager.searchStock(search, market);

      const table = new Table({
        head: Object.keys(searchStocks[0]),
        style: { head: ["yellow"] },
      });

      searchStocks.forEach((stock) => table.push(Object.values(stock)));

      console.log(table.toString());
      // logSearchTable(table, search);
    } catch (error) {
      logError(error.message, "search");
    }
  },
};

module.exports = apiCheck;
