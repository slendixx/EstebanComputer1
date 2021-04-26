// TODO:

// *** Command line options ***
// -t display tokens for each source file
// -d display tokens only for source files that caused errors
// -s display symbol table after parsing
// -o specify name for the output file

const fs = require("fs");
const dotenv = require("dotenv");
const parser = require("./src/models/parser");

dotenv.config({ path: "./config.env" });

const parseCommandLineOptions = function (commandLineArgs) {
  commandLineArgs.forEach((arg) => {
    if (arg === "-t") process.env.COMMAND_LINE_OPTION_t = true;
    if (arg === "-d") process.env.COMMAND_LINE_OPTION_d = true;
    if (arg === "-s") process.env.COMMAND_LINE_OPTION_s = true;
    if (arg === "-o") process.env.COMMAND_LINE_OPTION_o = true;
  });
};
const removeCommandLineOptions = function (commandLineArgs) {
  return commandLineArgs.filter((arg) => {
    return !process.env.COMMAND_LINE_OPTIONS.includes(arg);
  });
};
const displaySymbolTable = function (symbolTable) {
  symbolTable.forEach((symbol, index) => {
    console.log(`${index + 1}: ${symbol.type}{
      address: ${symbol.address},
      id: ${symbol.id},
      value: ${symbol.value}${
      symbol.type === "branch" ? ",\n\tbranch type: " + symbol.branchType : ""
    }
    }`);
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

if (process.env.COMMAND_LINE_OPTION_s === "true")
  displaySymbolTable(symbolTable);
