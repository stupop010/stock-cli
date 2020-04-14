const program = require("commander");
const stock = require("../commands/stock");

program
  .option("-s, --stock <symbol>", "Get price for a single stock")
  .option(
    "-d, --daily <symbol> [days]",
    "Get info about a stock from the last number of days"
  )
  .option(
    "-w, --week <symbol> [weeks]",
    "Get info about a stock from the last number of weeks"
  )
  .option(
    "-m, --monthly <symbol> [months]",
    "Get info about a stock from the last number of months"
  )
  .action((cmd, options) => {
    if (cmd.stock) stock.fetchStock(program.stock);
    if (cmd.daily) stock.dailyStock(cmd.daily, options);
    if (cmd.week) stock.weeklyStock(cmd.week, options);
    if (cmd.monthly) stock.monthlyStock(cmd.monthly, options);
  });

program.parse(process.argv);

if (!process.argv[2]) {
  return program.outputHelp();
}
