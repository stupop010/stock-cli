const axios = require("axios");

class ApiManager {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://www.alphavantage.co/";
  }

  async fetchPrice(stock, market) {
    const ifMarket = market ? `.${market}` : "";
    try {
      const fetchedStock = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}${ifMarket}&apikey=${this.apiKey}`
      );

      console.log(fetchedStock.data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ApiManager;
