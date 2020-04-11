const program = require("commander");
const stock = require("../commands/stock");

program
  .option("-s, --stock <symbol> [market]", "Get price for a single stock")
  .option("-d, --daily <symbol> [market]", "Get price for a single stock")
  .option("-w, --week <symbol> [market]", "Get price for a single stock")
  .option("-m, --monthly <symbol> [market]", "Get price for a single stock")
  .action((cmd, options) => {
    // If no arguments out put help
    if (!process.argv[2]) {
      return program.outputHelp();
    }
    console.log(cmd.week);
    // stock.fetchStock(options);
  });

program.parse(process.argv);
