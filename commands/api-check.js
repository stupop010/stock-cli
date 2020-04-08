const colors = require("colors");

const KeyManager = require("../lib/KeyManager");
const ApiManager = require("../lib/ApiManager");
const checkArgv = require("../utils/checkArgv");
const APIKEY = require("../lib/constant/index");

const fetchKey = () => {
  const keyManager = new KeyManager();
  const key = keyManager.get(APIKEY);
  return key;
};

const apiCheck = {
  async fetchPrice(argv) {
    try {
      const { stock, market } = checkArgv(argv);

      const key = fetchKey();

      const apiManager = new ApiManager(key);

      apiManager.fetchPrice(stock, market);
    } catch (error) {
      console.error(error.message.blue);
    }
  },
};

module.exports = apiCheck;
