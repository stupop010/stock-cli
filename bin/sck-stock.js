const program = require("commander");
const stock = require("../commands/stock");

program
  .command("stock <symbol> [market...]", "Get price for a single stock")
  .action((cmd, options) => {
    // If no arguments out put help
    if (!process.argv[2]) {
      return program.outputHelp();
    }

    stock.fetchStock(options);
  });

program.parse(process.argv);
