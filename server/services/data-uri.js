const DatauriParser = require('datauri/parser');
const path = require('path');
const parser = new DatauriParser();

// dUri.format('.png', buffer);
exports.dataUri = (file) => parser.format(path.extname(file.originalname).toString(), file.buffer);
