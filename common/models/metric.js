'use strict';
const processFile = require('../../server/lib/processFile');

module.exports = function(Metric) {

  Metric.checkFileMetric = (fileName, cb) => {
    let file = processFile(Metric, fileName);
    cb(null, file.message);
  }
  
  Metric.remoteMethod('checkFileMetric', {
    accepts: { arg: 'fileName', type: 'string' },
    returns: { arg: 'isValid', type: 'string' }
  });

};
