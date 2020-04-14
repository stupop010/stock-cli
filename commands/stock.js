const Table = require("cli-table3");

const KeyManager = require("../lib/KeyManager");
const ApiManager = require("../lib/ApiManager");
const { checkMarket, checkArgv, checkTimeEntries } = require("../utils/index");
const APIKEY = require("../lib/constant/index");
const {
  logTable,
  logError,
  logSearchTable,
  logTimeSeriesTable,
} = require("../lib/logger");

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
      logError(error.message);
    }
  },
  async dailyStock(stock, numOfDays) {
    try {
      // check the numOfDays arguments
      checkTimeEntries(numOfDays);

      const key = fetchKey();
      const apiManager = new ApiManager(key);
      const daily = await apiManager.dailyStock(stock, numOfDays);

      const table = new Table({
        head: Object.keys(daily[0]),
        style: { head: ["yellow"] },
        wordWrap: true,
      });

      daily.forEach((stock) => table.push(Object.values(stock)));

      logTimeSeriesTable(table, stock, `${numOfDays} days`);
    } catch (error) {
      logError(error.message);
    }
  },
  async weeklyStock(stock, numOfWeeks) {
    try {
      // Check the numOfWeeks arguments
      checkTimeEntries(numOfWeeks);

      const key = fetchKey();
      const apiManager = new ApiManager(key);
      const weekly = await apiManager.weeklyStock(stock, numOfWeeks);

      const table = new Table({
        head: Object.keys(weekly[0]),
        style: { head: ["yellow"] },
        wordWrap: true,
      });

      weekly.forEach((stock) => table.push(Object.values(stock)));

      logTimeSeriesTable(table, stock, `${numOfWeeks} weeks`);
    } catch (error) {
      logError(error.message);
    }
  },
  async monthlyStock(stock, numOfMonth) {
    try {
      // Check the numOfMonth arguments
      checkTimeEntries(numOfMonth);

      const key = fetchKey();
      const apiManager = new ApiManager(key);
      const monthly = await apiManager.monthlyStock(stock, numOfMonth);

      const table = new Table({
        head: Object.keys(monthly[0]),
        style: { head: ["yellow"] },
        wordWrap: true,
      });

      monthly.forEach((stock) => table.push(Object.values(stock)));

      logTimeSeriesTable(table, stock, `${numOfMonth} months`);
    } catch (error) {
      logError(error.message);
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
