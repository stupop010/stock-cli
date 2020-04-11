const program = require("commander");
const stock = require("../commands/stock");

program
  .command("search <search> [market]", "Search for Socket")
  .action((cmd, options) => {
    // If no arguments out put help
    if (!process.argv[2]) {
      return program.outputHelp();
    }
    stock.searchStock(options);
  });

program.parse(process.argv);
