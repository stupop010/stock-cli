const program = require("commander");
const apiCheck = require("../commands/api-check");

program
  .option("-p , --price <symbol> [market...]", "Get price for a single stock")
  .option("-s , --search <search> [market...]", "Search for a stock symbol")
  .action((cmd, options) => {
    // If no arguments out put help
    if (!process.argv[2]) {
      return program.outputHelp();
    }

    if (cmd.search) apiCheck.searchStock(cmd.search, options);
    if (cmd.price) apiCheck.fetchPrice(cmd.price, options);
  });

program.parse(process.argv);
