const checkMarket = (market) => {
  let checkedMarket = [];

  if (market) {
    market.forEach((i) => checkedMarket.push(i));
  }

  if (checkedMarket.length > 1) {
    throw new Error(
      `Only allows one argument for market, you have input ${market.length}`
    );
  }

  return checkedMarket[0] ? checkedMarket[0] : null;
};

module.exports = checkMarket;
