//TODO:
//I haven't thought of i'm going to parse floating point numbers

const tokenize = require("./tokenizer");
const Variable = require("./symbols/variable");
const Pointer = require("./symbols/pointer");
const Label = require("./symbols/label");

const dictionary = {};
const symbolTable = [];

let address = 0;
let directiveExpected = false;
let orgArgExpected = false;
let variableDeclarationExpected = false;
let variableArgExpected = false;
let labelDeclarationExpected = false;
let pointerDeclarationExpected = false;
let pointerArgExpected = false;
let instructionArgExpected = false;

const parse = function (sourceFiles) {
  sourceFiles.forEach((sourceFile) => {
    const tokens = tokenize(sourceFile, symbolTable);
    if (process.env.COMMAND_LINE_OPTION_a === "true") console.log(tokens);
    buildSymbolTable(tokens, symbolTable);
    // resolveSemantics(symbolTable);
    if (process.env.COMMAND_LINE_OPTION_t === "true") console.log(symbolTable);
  });
};

const buildSymbolTable = function (tokens) {
  tokens.forEach((token, index) => {
    try {
      determineCase(token, index + 1);
    } catch (error) {
      if (process.env.COMMAND_LINE_OPTION_d === "true") console.log(tokens);
      throw error;
    }
  });
};
const determineCase = function (token) {
  const tokenNumericValue = parseFloat(token.value);
  if (directiveExpected) {
    if (isDirective(token.value)) {
      if (isOrg(token.value)) {
        directiveExpected = false;
        orgArgExpected = true;
      } else {
        address++;
      }
    } else {
      throw new Error(
        `Syntax error at token ${token.i}: expected directive. Got "${token.value}"`
      );
    }
  } else if (orgArgExpected) {
    if (isNumber(tokenNumericValue)) {
      const tokenValue = parseInt(token.value, 10);
      if (tokenValue > address) {
        address = tokenValue;
        orgArgExpected = false;
      } else {
        throw new Error(
          `Pragmatic error at token ${token.i}: Argument passed to .org "${token.value}" is less than current address ${address}`
        );
      }
    } else {
      throw new Error(
        `Syntax error at token ${token.i}: expected numeric constant as org argument. Got "${token.value}"`
      );
    }
  } else if (variableDeclarationExpected) {
    if (!isNumber(tokenNumericValue)) {
      if (!isInDictionary(token.value)) {
        variableDeclarationExpected = false;
        variableArgExpected = true;
        symbolTable.push(new Variable({ address: address, id: token.value }));
      } else {
        throw new Error(
          `Lexical error at token ${token.i}: cannot use reserved keyword/operator "${token.value}" as variable identifier`
        );
      }
    } else {
      throw new Error(
        `Syntax error at token ${token.i}: cannot use numeric constant ${token.value} as variable identifier.`
      );
    }
  } else if (variableArgExpected) {
    if (isNumber(tokenNumericValue)) {
      variableArgExpected = false;
      symbolTable[symbolTable.length - 1].value = token.value;
      symbolTable[symbolTable.length - 1].toBeResolved = false;
      address++;
    } else {
      if (!isInDictionary(token.value)) {
        variableArgExpected = false;
        symbolTable[symbolTable.length - 1].valueHolderId = token.value;
        address++;
      } else {
        throw new Error(
          `Syntax error at token ${token.i}: Unexpected value "${token.value}" for variable declaration`
        );
      }
    }
  } else if (labelDeclarationExpected) {
    if (!isNumber(tokenNumericValue)) {
      if (!isInDictionary(token.value)) {
        labelDeclarationExpected = false;
        symbolTable.push(new Label({ address: address, id: token.value }));
      } else {
        throw new Error(
          `Lexical error at token ${token.i}: cannot use reserved keyword/operator "${token.value}" as label identifier`
        );
      }
    } else {
      throw new Error(
        `Syntax error at token ${token.i}: cannot use numeric constant "${token.value}" as label identifier`
      );
    }
  } else if (pointerDeclarationExpected) {
    if (!isNumber(tokenNumericValue)) {
      if (!isInDictionary(token.value)) {
        pointerDeclarationExpected = false;
        pointerArgExpected = true;
        symbolTable.push(new Pointer({ address: address, id: token.value }));
      } else {
        throw new Error(
          `Lexical error at token ${token.i}: cannot use reserved keyword/operator "${token.value}" as pointer identifier`
        );
      }
    } else {
      throw new Error(
        `Syntax error at token ${token.i}: cannot use numeric constant "${token.value}" as pointer identifier`
      );
    }
  } else if (pointerArgExpected) {
    if (!isNumber(tokenNumericValue)) {
      if (!isInDictionary(token.value)) {
        pointerArgExpected = false;
        symbolTable[symbolTable.length - 1].valueHolderId = token.value;
        address++;
      } else {
        throw new Error(
          `Lexical error at token ${token.i}: cannot use reserved keyword/operator "${token.value}" as pointer argument`
        );
      }
    } else {
      throw new Error(
        `Syntax error at token ${token.i}: cannot use numeric constant "${token.value}" as pointer argument`
      );
    }
  } else if (instructionArgExpected) {
    if (isNumber(tokenNumericValue)) {
      instructionArgExpected = false;
      address++;
    } else {
      if (!isInDictionary(token.value)) {
        instructionArgExpected = false;
        address++;
      } else {
        throw new Error(
          `Lexical error at token ${token.i}: cannot use reserved keyword/operator "${token.value}" as instruction argument`
        );
      }
    }
  } else if (token.value === ".") {
    directiveExpected = true;
  } else if (token.value === "$") {
    variableDeclarationExpected = true;
  } else if (token.value === ":") {
    labelDeclarationExpected = true;
  } else if (token.value === "#") {
    pointerDeclarationExpected = true;
  } else if (isSingleArgInstruction(token.value)) {
    instructionArgExpected = true;
  } else if (isNoArgInstruction(token.value)) {
    address++;
  } else {
    throw new Error(`Unknown token at token ${token.i}: "${token.value}"`);
  }

  // console.log(
  //   `token: ${token}, instructionArgExpected: ${instructionArgExpected}`
  // );
};

const isOperator = function (token) {
  return module.exports.dictionary.operators.some((op) => op === token);
};

const isDirective = function (token) {
  return module.exports.dictionary.directives.some((dir) => dir === token);
};

const isOrg = function (token) {
  return token === "org";
};

const isNumber = function (token) {
  // const reg = new RegExp(/^\d+$/);
  const reg = new RegExp(/^[+-]?\d+(\.\d+)?$/);
  return reg.test(token);
};

const isSingleArgInstruction = function (token) {
  return module.exports.dictionary.singleArgInstructions.some(
    (inst) => inst === token
  );
};

const isNoArgInstruction = function (token) {
  return module.exports.dictionary.noArgInstructions.some(
    (inst) => inst === token
  );
};

const isInDictionary = function (token) {
  const operator = isOperator(token);
  const directive = isDirective(token);
  const singleArgInstruction = isSingleArgInstruction(token);
  const noArgInstruction = isNoArgInstruction(token);

  return operator || directive || noArgInstruction || singleArgInstruction;
};

module.exports.dictionary = dictionary;
module.exports.parse = parse;
