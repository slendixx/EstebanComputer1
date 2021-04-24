//TODO:
// Since i haven't figured out a way of identify the line each token belongs to
// I could throw errors from this module onto the main module stating exactly
// what token caused an error

const tokenize = require("./tokenizer");

const symbolTable = [];
module.exports.dictionary = [];

module.exports.parse = function (sourceFiles) {
  sourceFiles.forEach((sourceFile) => {
    const tokens = tokenize(sourceFile, symbolTable);
    buildSymbolTable(tokens, symbolTable);
  });
};

const buildSymbolTable = function (tokens, symbolTable) {};
