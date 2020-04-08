const program = require("commander");
const apiCheck = require("../commands/api-check");

program
  .command("price")
  .description("Check stock price")
  .option("-s , --single <symbol> [market...]", "Get price for a single stock")
  .action((cmd, options) => apiCheck.fetchPrice(options));

program.parse(process.argv);
