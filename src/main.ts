import { Command } from "commander";
import figlet from "figlet";
import appRootPath from "app-root-path";

import env from "./env";
import { run } from "./run";
import chalk from "chalk";

const program = new Command();
const AsciiArt = figlet.textSync(env.APP_NAME, {
  font: "Slant"
});

program
  .name(env.APP_NAME)
  .description(env.APP_DESCRIPTION)
  .version(env.APP_VERSION)

program.name("Initialize").command("init")
  .description("Create sample file.")
  .action(() =>{
    console.log(appRootPath.toString());
  });

program.name("Run").command("run")
  .action(run);

console.log(`${AsciiArt}\n`);
program.parse();
