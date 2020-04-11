const axios = require("axios");
const colors = require("colors");

class ApiManager {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://www.alphavantage.co/";
  }

  async fetchStock(stock, market) {
    const ifMarket = market ? `.${market}` : "";
    try {
      const { data } = await axios.get(
        `${this.baseUrl}query?function=GLOBAL_QUOTE&symbol=${stock}${ifMarket}&apikey=${this.apiKey}`
      );

      //   If we get data Note, means we used to many API calls
      if (data.hasOwnProperty("Note")) throw new Error(data.Note);

      if (data.hasOwnProperty("Error Message")) {
        const ifMarket = market ? `in stock market `.red + market.blue : "";
        throw new Error(`Can't find ${stock.blue} ${ifMarket}`);
      }

      const parseStock = this._parseStockPrice(data["Global Quote"]);

      return parseStock;
    } catch (error) {
      this._errorHandling(error);
    }
  }

  async searchStock(search, market) {
    const ifMarket = market ? `.${market}` : "";
    const searchString = search.replace(/ /g, "+");

    try {
      const { data } = await axios.get(
        `${this.baseUrl}query?function=SYMBOL_SEARCH&keywords=${searchString}${ifMarket}&apikey=${this.apiKey}`
      );

      //   If we get data Note, means we used to many API calls
      if (data.Note) throw new Error(data.Note);

      if (data.bestMatches.length < 1)
        throw new Error(`No matches for ${search.blue}`);

      const parseStock = data.bestMatches.map((stock) =>
        this._parseStockPrice(stock)
      );
      // console.log(searchResul);
      return parseStock;
    } catch (error) {
      this._errorHandling(error);
    }
  }

  _parseStockPrice(data) {
    const returnStock = {};

    const keys = Object.keys(data);
    const values = Object.values(data);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i].split(" ").splice(1).join().replace(/,/g, "_");
      returnStock[key] = values[i];
    }

    return returnStock;
  }

  _errorHandling(error) {
    if (error.code === "ENOTFOUND") {
      throw new Error("No internet connection, please connect");
    }

    if (error.message) {
      throw new Error(error.message);
    }
  }
}

module.exports = ApiManager;
