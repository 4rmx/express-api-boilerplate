const bodyParser = require('body-parser')

exports.jsonParser = bodyParser.json()
exports.jsonLimitParser = bodyParser.json({ limit: '10mb' });
exports.urlencodedParser = bodyParser.urlencoded({ extended: true });
