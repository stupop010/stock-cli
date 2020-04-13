const program = require("commander");
const stock = require("../commands/stock");

program
  .option("-s, --stock <symbol>", "Get price for a single stock")
  .option("-d, --daily <symbol> <days>", "Get price for a single stock")
  .option("-w, --week <symbol> [market]", "Get price for a single stock")
  .option("-m, --monthly <symbol> [market]", "Get price for a single stock")
  .action((cmd, options) => {
    if (cmd.stock) stock.fetchStock(program.stock);
    if (cmd.daily) stock.dailyStock(cmd.daily, options);
    // stock.dailyStock(program.daily);
    if (program.week) console.log(cmd.stock, options);
    if (program.monthly) console.log(cmd.stock, options);
  });

program.parse(process.argv);

if (!process.argv[2]) {
  return program.outputHelp();
}
