'use strict';
require('dotenv').config();

const path = require('path');
const publicPath = path.join(__dirname, '..', 'client');

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');

    app.get('/file-uploads', (req, res) => {
      res.sendFile(path.join(publicPath, 'index.html'), function(err) {
        if (err) res.status(500).send(err)
      })
    })

    
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
if (require.main === module){
  app.isBoot = true;
}
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
