const program = require("commander");
const key = require("../commands/key");

program
  .command("set")
  .description("Set API Key -- Get at https://www.alphavantage.co/")
  .action(key.set);

program.command("get").description("Show API Key").action(key.get);

program.command("delete").description("Delete API Key").action(key.delete);

program.parse(process.argv);

// // If no args, output help
