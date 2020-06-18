'use strict';
const spreadsheetsParser = require('../../server/lib/spreadsheetsParser');
const getLastRow = require('../../server/lib/getLastRow');

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

  Spreadsheet.getLastRegister = (cb) => {
    getLastRow().then(res => {
      cb(null, res)  
    }).catch(err => {
      cb(err, null)
    })
  }

  Spreadsheet.remoteMethod('getLastRegister', {
    http: {path: '/getLastRegister', verb: 'get'},
    returns: { arg: 'response', type: 'object' }
  })
};
