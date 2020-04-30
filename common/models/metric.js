'use strict';
//const processFile = require('../../server/lib/processFile');
const fs = require('fs');
const path = require('path');
module.exports = function(Metric) {

  /* Metric.checkFileMetric = (fileName, cb) => {
    let file = processFile(Metric, fileName);
    cb(null, file.message);
  }
  
  Metric.remoteMethod('checkFileMetric', {
    accepts: { arg: 'fileName', type: 'string' },
    returns: { arg: 'isValid', type: 'string' }
  }); */

  Metric.spreadsheets = (cb) => {
    cb(null)
  }

  Metric.remoteMethod('spreadsheets', {
    returns: { arg: 'response', type: 'string' }
  })

  Metric.getFiles = async (humanreadable, cb) => {
    let fileNames = await getFileName(humanreadable);
    cb(null, fileNames);
  }

  Metric.remoteMethod('getFiles', {
    accepts: { arg: 'humanreadable', type: 'boolean', default: false },
    returns: { arg: 'response', type: 'string' }
  });

  let getFileName = (humanreadable) => {
    let filePath = path.join(__dirname, "../../storage/tsv_files");
    return new Promise((resolve, reject) => {
      fs.readdir(filePath, (err, files) => {
        if (err) reject(err);
        let response = [];
        for (const file of files) {
          let fileSize = fs.statSync(filePath).size;
          if (humanreadable) fileSize = getReadableFileSizeString(fileSize);
          response.push({name: file, size: fileSize});
        }
        resolve(response);
      });
    });
  }

  let getReadableFileSizeString = (fileSizeInBytes) => {
    var i = -1;
    var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    do {
        fileSizeInBytes = fileSizeInBytes / 1024;
        i++;
    } while (fileSizeInBytes > 1024);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
  };

};
