// TODO:
// implement a command line option for displaying the tokens for each source file: -a (as for all)
// Another option could be display tokens for files that caused errors: -d (as for debug)
// implement option to display the symbol table once the input files are parsed: -t (as for table)
// implement option to specify an output file name: -o (as for output)

const fs = require("fs");
const parser = require("./src/models/parser");

const commandLineArgs = process.argv.slice(2);

let sourceFiles;
try {
  sourceFiles = commandLineArgs.map((arg) =>
    fs.readFileSync(`${arg}`, "utf-8")
  );
} catch (error) {
  console.error(`Error: Could not find '${error.path}'`);
  process.exit();
}

const dictionary = fs.readFileSync("./data/dictionary.json", "utf-8");
parser.dictionary = dictionary;
let symbolTable;
try {
  symbolTable = parser.parse(sourceFiles);
} catch (error) {
  console.error(error);
}
