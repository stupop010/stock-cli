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
      const fetchedStock = await axios.get(
        `${this.baseUrl}query?function=GLOBAL_QUOTE&symbol=${stock}${ifMarket}&apikey=${this.apiKey}`
      );

      //   If we get data Note, means we used to many API calls
      if (fetchedStock.data.Note) throw new Error(fetchedStock.data.Note);

      const parseStock = this._parseStockPrice(
        fetchedStock.data["Global Quote"]
      );

      return parseStock;
    } catch (error) {
      this._errorHandling(error);
    }
  }

  async searchStock(stock, market) {
    const ifMarket = market ? `.${market}` : "";
    const searchString = stock.replace(/ /g, "+");

    try {
      const search = await axios.get(
        `${this.baseUrl}query?function=SYMBOL_SEARCH&keywords=${searchString}${ifMarket}&apikey=${this.apiKey}`
      );

      //   If we get data Note, means we used to many API calls
      if (search.data.Note) throw new Error(search.data.Note);

      const parseStock = search.data.bestMatches.map((stock) =>
        this._parseStockPrice(stock)
      );

      return parseStock;
    } catch (error) {
      console.log(error);
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
