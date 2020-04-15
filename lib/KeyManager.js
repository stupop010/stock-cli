const Configstore = require("configstore");
const packageJson = require("../package.json");

class KeyManager {
  constructor() {
    this.confStore = new Configstore(packageJson.name);
  }

  _fetchKey(keyName) {
    const key = this.confStore.get(keyName);

    if (!key) {
      throw new Error(
        "No API key found -- Get a key at https://www.alphavantage.co/"
      );
    }

    return key;
  }

  set(keyName, keyData) {
    this.confStore.set(keyName, keyData);

    return keyName;
  }

  get(keyName) {
    const key = this._fetchKey(keyName);

    return key;
  }

  delete(keyName) {
    this._fetchKey(keyName);

    this.confStore.delete(keyName);
  }
}

module.exports = KeyManager;
