#!/usr/bin/env node

const program = require("commander");
const packageJson = require("../package.json");

program
  .version(packageJson.version)
  .command("key", "Manage API Key -- https://www.alphavantage.co/")
  .command("check", "Check Stock Price")
  .parse(process.argv);
