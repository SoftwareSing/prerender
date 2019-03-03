const fs = require('fs');
const path = require('path');
const http = require('http');
const util = require('./util');
const basename = path.basename;
const server = require('./server');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');

const https = require('https');
const sslOptions = require('../sslOptions');

exports = module.exports = (options = {}) => {
	const port = options.port || process.env.PORT || 3000;
	const httpsport = options.httpsport || 3001;

	server.init(options);
	server.onRequest = server.onRequest.bind(server);

	app.disable('x-powered-by');
	app.use(compression());

	app.get('*', server.onRequest);

	//dont check content-type and just always try to parse body as json
	app.post('*', bodyParser.json({ type: () => true }), server.onRequest);

	app.set('httpsport', httpsport);
	https.createServer(sslOptions, app).listen(app.get('httpsport'));
	app.listen(port, () => util.log(`Prerender server accepting requests on port ${port}`))

	return server;
};

fs.readdirSync(__dirname + '/plugins').forEach((filename) => {
	if (!/\.js$/.test(filename)) return;

	var name = basename(filename, '.js');

	function load() {
		return require('./plugins/' + name);
	};

	Object.defineProperty(exports, name, {
		value: load
	});
});