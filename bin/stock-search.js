const program = require("commander");
const stock = require("../commands/stock");

program
  .option("-s, --search <search> [market]", "Search for a stock")
  .action((cmdObj, market) => stock.searchStock(cmdObj.search, market));

if (!process.argv[2]) {
  return program.outputHelp();
}

program.parse(process.argv);
