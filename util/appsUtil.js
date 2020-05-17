var retrieveToken = (stringItem, tokenIndex) => {
    var tokens = stringItem.split(" ");
    var reqdToken = tokens[tokenIndex];
    return reqdToken;
}

module.exports = {
    retrieveToken: retrieveToken
  }