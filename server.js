#!/usr/bin/env node
var prerender = require('./lib');

var server = prerender({
  port: 3900,
  waitAfterLastRequest: 3000
});

server.use(prerender.sendPrerenderHeader());
// server.use(prerender.blockResources());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

server.start();
process.env.DISABLE_LOGGING = true;
