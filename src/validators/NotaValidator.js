const validator = require('validator');

const nfceKey = /[0-9]{44}/;

function isNfceKey (key) {
  return nfceKey.test(key);
}

exports.isNfceKey = isNfceKey;