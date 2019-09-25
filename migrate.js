'use strict';

var server = require('./server/server');
var ds = server.dataSources.db;

ds.connector.observe('before execute', async (ctx) => {
    console.log('SQL: ', ctx.req.sql, ctx.req.params)
})

ds.autoupdate(function (er) {
    if (er) throw er;
    console.log('Loopback tables created in ', ds.adapter.name);
    ds.disconnect();
})