'use strict';

const path = require('path');
const parser = require('csv-parse');
const fs = require('fs');
const container = 'customers';

const columns = [
  { 'name': 'name' },
  { 'name': 'segment1' },
  { 'name': 'segment2' },
  { 'name': 'segment3' },
  { 'name': 'segment4' },
  { 'name': 'platformId' },
  { 'name': 'clientId' }
];

let createError = (message, status = 422) => {
  var error = new Error(message);
  error.statusCode = status
  return error
}

let parseFile = (file) => {
  let filePath = path.join(file.client.root, file.container, file.name);
  
  if (filePath.substr(-4) == '.csv') {
    return new Promise((resolve, reject) => {
      
      fs.readFile(filePath, (err, data) => {
        if (err) {
          return reject(createError('Cannot read CSV file'))
        }
        let options = {
          columns: columns.map(c => c.name),
          delimiter: ','
        }
        parser(data, options, (err, rows) => {
          if (err) {
            return reject(createError('Cannot parse CSV file (check if the file is a valid CSV and if the rows match the expected format)'))
          }
          resolve(rows)
        })
      })
    })
  }
  throw createError('Only CSV file can be imported')
}

module.exports = async (Storage, file) => {
  if (file.container != container) return;

  let loadFile = () => new Promise(function (resolve, reject) {
    Storage.app.dataSources.storage.connector.getFile(file.container, file.name, (err, file) => {
      if (err) reject(createError('Cannot find the file or the storage'));
      resolve(file)
    })
  })

  let content = await loadFile();
  let rows = await parseFile(content);
  rows.shift();

  const Customer = Storage.app.models.Customer;

  for (const row of rows) {
    try {
      await Customer.create({
        name: row.name,
        segment1: row.segment1,
        segment2: row.segment2,
        segment3: row.segment3,
        segment4: row.segment4,
        platformId: row.platformId,
        clientId: row.clientId
      });    
    } catch (e) {
      throw e;
    }
  }

  return 'The file has been successfully uploaded.'
};