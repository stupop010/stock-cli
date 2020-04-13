const axios = require("axios");
const values = require("lodash.values");
const colors = require("colors");

class ApiManager {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://www.alphavantage.co/";
  }

  async fetchStock(stock) {
    try {
      const { data } = await axios.get(
        `${this.baseUrl}query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${this.apiKey}`
      );

      //   If we get data Note, means we used to many API calls
      if (data.hasOwnProperty("Note")) throw new Error(data.Note);

      if (data.hasOwnProperty("Error Message")) {
        const market = stock.split(".");
        const ifMarket = market[1]
          ? `in stock market `.red + market[1].blue
          : "";
        throw new Error(`Can't find ${stock.blue} ${ifMarket}`);
      }

      const parseStock = this._parseStockPrice(data["Global Quote"]);

      return parseStock;
    } catch (error) {
      this._errorHandling(error);
    }
  }

  async dailyStock(stock, numOfDays) {
    try {
      const { data } = await axios.get(
        `${this.baseUrl}query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${this.apiKey}`
      );
      // const dailyAmount = data.slice(1, numOfDays);
      // console.log(dailyAmount);
      // console.log(data["Time Series (Daily)"]);
      const dailyArray = values(data);

      console.log(dailyArray);
    } catch (error) {
      this._errorHandling(error);
    }
  }

  async searchStock(search, market) {
    const mrk = market ? `.${market}` : "";
    const searchString = search.replace(/ /g, "+");

    try {
      const { data } = await axios.get(
        `${this.baseUrl}query?function=SYMBOL_SEARCH&keywords=${searchString}${mrk}&apikey=${this.apiKey}`
      );

      //   If we get data Note, means we used to many API calls
      if (data.Note) throw new Error(data.Note);

      if (data.bestMatches.length < 1) {
        const ifMarket = market ? "in stock market ".red + market.blue : "";
        throw new Error(`No matches for ${search.blue} ${ifMarket}`);
      }

      const parseStock = data.bestMatches.map((stock) =>
        this._parseStockPrice(stock)
      );

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
