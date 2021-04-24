const fs = require("fs");
const tokenizer = require("./src/models/tokenizer");
const Parser = require("./src/models/parser");

const input = fs.readFileSync("test1.txt", "utf-8");
const dictionaryData = fs.readFileSync("./data/dictionary.json", "utf-8");
const dictionary = JSON.parse(dictionaryData);
const tokens = tokenizer.tokenize(input);

const parser = new Parser(dictionary);
parser.parse(tokens);
