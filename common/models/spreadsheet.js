'use strict';
const spreadsheetsParser = require('../../server/lib/spreadsheetsParser')

module.exports = function(Spreadsheet) {

  Spreadsheet.getRegisters = (cb) => {
    spreadsheetsParser().then(res => {
      cb(null, res)  
    }).catch(err => {
      cb(err, null)
    })
  }

  Spreadsheet.remoteMethod('getRegisters', {
    http: {path: '/', verb: 'get'},
    returns: { arg: 'response', type: 'array' }
  })
};
