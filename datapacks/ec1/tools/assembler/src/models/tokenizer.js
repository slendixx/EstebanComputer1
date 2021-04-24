class Tokenizer {
  tokenize(input) {
    let buffer = input
      .replace(/\<(.*)\>/g, "")
      .replace(/\./g, " . ")
      .replace(/:/g, " : ")
      .replace(/\s\s+/g, " ")
      .split(" ");
    return buffer;
  }
}

module.exports = new Tokenizer();
