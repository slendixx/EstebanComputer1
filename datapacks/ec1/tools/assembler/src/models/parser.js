module.exports = class Parser {
  _dictionary;
  constructor(dictionary) {
    this._dictionary = dictionary;
  }
  parse(tokens) {
    const parseInfo = {
      address: 0,
      numberExpected: false,
    };
    const symbolTable = {};

    if (!this._testforBegEnd(tokens)) {
      console.log("Error: Missing .beg || .end directive/s.");
      return;
    }

    for (let i = 0; i < tokens.length; i++) {
      console.log(
        `Token: ${tokens[i]} is instruction? ${this._isInstruction(
          this._dictionary,
          tokens[i]
        )}`
      );
      if (tokens[i] === ".") {
        //parse next token as directive
        i++;
        this._parseDirective(tokens, i, parseInfo);
        continue;
      }
      if (tokens[i] === ":") {
        //parse next token as label definition
        continue;
      }
      if (this._isInstruction(this._dictionary, tokens[i])) {
        //parse token as instruction
        continue;
      }
      if (tokens[i] === "") {
        //ignore some empty string left from the tokenizer
        continue;
      }

      //any other case causes an error
      console.error(
        `Error: Unexpected token: ${tokens[i]} for address: ${address}`
      );
      if (process.env.EXIT_ON_ERROR) process.exit();
    }

    return symbolTable;
  }

  _testforBegEnd(tokens) {
    const hasBeg = tokens.some((token) => token === "beg");
    const hasEnd = tokens.some((token) => token === "end");
    return hasBeg && hasEnd;
  }

  _parseDirective(tokens, tokenIndex, parseInfo) {
    if (tokens[tokenIndex] === "org") {
      parseInfo.address = tokens[++tokenIndex];
    }
  }

  _isOndictionary(dictionary) {}

  _isInstruction(dictionary, token) {
    const isNoArgInst = dictionary.noArgInstructions.some(
      (instruction) => instruction === token
    );
    const isSingleArgInst = dictionary.singleArgInstructions.some(
      (instruction) => instruction === token
    );
    return isNoArgInst || isSingleArgInst;
  }
};
