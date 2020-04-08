const inquirer = require("inquirer");
const colors = require("colors");
const KeyManager = require("../lib/KeyManager");
const APIKEY = require("../lib/constant/index");

const apiQuestions = {
  name: "apiKey",
  message: "Enter a api key".green,
  validate: (input) => {
    return input === "" ? "A value is required" : true;
  },
};

const apiKeys = {
  async set() {
    const keyManager = new KeyManager();

    const input = await inquirer.prompt([apiQuestions]);

    const key = keyManager.set(APIKEY, input.apiKey);

    if (key) console.log("API Key Set".blue);
  },

  get() {
    const keyManager = new KeyManager();

    try {
      const key = keyManager.get(APIKEY);

      console.log(key.magenta.bold);
    } catch (error) {
      console.error(error.message.red);
    }
  },

  delete() {
    const keyManager = new KeyManager();

    try {
      keyManager.delete(APIKEY);
    } catch (error) {
      console.error(error.message.red);
    }
  },
};

module.exports = apiKeys;
