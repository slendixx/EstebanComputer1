const Symbol = require("./symbol");

class Label extends Symbol {
  constructor({ address, id }) {
    super({
      type: "variable",
      address: address,
      id: id,
      value: null,
      toBeResolved: true,
      valueHolderId: null,
    });
  }
}

module.exports = Label;
