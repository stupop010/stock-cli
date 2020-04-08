const program = require("commander");
const apiKeys = require("../commands/api-key");

program
  .command("set")
  .description("Set API Key -- Get at https://www.alphavantage.co/")
  .action(apiKeys.set);

program.command("show").description("Show API Key").action(apiKeys.get);

program.command("delete").description("Delete API Key").action(apiKeys.delete);

program.parse(process.argv);

// // If no args, output help
