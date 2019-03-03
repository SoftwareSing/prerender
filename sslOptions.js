const fs = require('fs');

const options = {
  key: fs.readFileSync('./yourkey.pem'),
  cert: fs.readFileSync('./yourcert.pem')
};

module.exports = options;
