// TODO:

const fs = require("fs");
const dotenv = require("dotenv");
const parser = require("./src/models/parser");

dotenv.config({ path: "./config.env" });

const parseCommandLineOptions = function (commandLineArgs) {
  commandLineArgs.forEach((arg) => {
    if (arg === "-a") process.env.COMMAND_LINE_OPTION_a = true;
    if (arg === "-d") process.env.COMMAND_LINE_OPTION_d = true;
    if (arg === "-t") process.env.COMMAND_LINE_OPTION_t = true;
    if (arg === "-o") process.env.COMMAND_LINE_OPTION_o = true;
  });
};
const removeCommandLineOptions = function (commandLineArgs) {
  return commandLineArgs.filter((arg) => {
    return !process.env.COMMAND_LINE_OPTIONS.includes(arg);
  });
};

const commandLineArgs = process.argv.slice(2);

parseCommandLineOptions(commandLineArgs);
sourceFilePaths = removeCommandLineOptions(commandLineArgs);

let sourceFiles;
try {
  sourceFiles = sourceFilePaths.map((arg) =>
    fs.readFileSync(`${arg}`, "utf-8")
  );
} catch (error) {
  console.error(`Error: Could not find source file '${error.path}'`);
  process.exit();
}

const dictionary = fs.readFileSync("./data/dictionary.json", "utf-8");
parser.dictionary = JSON.parse(dictionary);

let symbolTable;
try {
  symbolTable = parser.parse(sourceFiles);
} catch (error) {
  console.error(error.message);
}
