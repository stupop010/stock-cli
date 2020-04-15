const inquirer = require("inquirer");
const colors = require("colors");

const KeyManager = require("../lib/KeyManager");
const { log, logError } = require("../lib/logger");
const APIKEY = require("../lib/constant/index");

const apiQuestions = {
  name: "apiKey",
  message: "Enter a api key".green,
  validate: (input) => {
    return input === "" ? "A value is required" : true;
  },
};

const key = {
  async set() {
    const keyManager = new KeyManager();

    const input = await inquirer.prompt([apiQuestions]);

    const key = keyManager.set(APIKEY, input.apiKey);

    if (key) log("API Key Set");
  },

  get() {
    const keyManager = new KeyManager();

    try {
      const key = keyManager.get(APIKEY);
      log(key);
    } catch (error) {
      logError(error.message);
    }
  },

  delete() {
    const keyManager = new KeyManager();

    try {
      keyManager.delete(APIKEY);
      log("Key Delete");
    } catch (error) {
      logError(error.message);
    }
  },
};

module.exports = key;
