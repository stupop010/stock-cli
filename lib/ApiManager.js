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

      //   If we get data Note, means we used to many API calls
      if (data.hasOwnProperty("Note")) throw new Error(data.Note);

      // console.log(data);
      const dailyData = data["Time Series (Daily)"];

      const daily = this._timeSeries(dailyData, numOfDays);

      return daily;
    } catch (error) {
      this._errorHandling(error);
    }
  }

  async weeklyStock(stock, numOfWeek) {
    try {
      const { data } = await axios.get(
        `${this.baseUrl}query?function=TIME_SERIES_WEEKLY&symbol=${stock}&apikey=${this.apiKey}`
      );
      const weeklyData = data["Weekly Time Series"];
      const weekly = this._timeSeries(weeklyData, numOfWeek);

      return weekly;
    } catch (error) {
      this._errorHandling(error);
    }
  }

  async monthlyStock(stock, numOfMonth) {
    try {
      const { data } = await axios.get(
        `${this.baseUrl}query?function=TIME_SERIES_MONTHLY&symbol=${stock}&apikey=${this.apiKey}`
      );

      const monthlyData = data["Monthly Time Series"];
      const monthly = this._timeSeries(monthlyData, numOfMonth);

      return monthly;
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
      const key = keys[i].split(" ");
      if (key.length > 1) {
        const keys = key.splice(1).join().replace(/,/g, "_");

        returnStock[keys] = values[i];
      } else {
        returnStock[key] = values[i];
      }
    }

    return returnStock;
  }

  _timeSeries(array, sliceTo) {
    let a = [];

    for (let [key, value] of Object.entries(array)) {
      a.push({ date: key, ...value });
    }

    const sliceArray = a.slice(0, sliceTo);
    const returnArray = sliceArray.map((stock) => this._parseStockPrice(stock));
    return returnArray;
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
