'use strict'
const { GoogleSpreadsheet } = require('google-spreadsheet');
const patient = process.env.SPREADSHEET_DOC_ID_PATIENT;

const columns = [
  'Apellido y nombre',
  'Número de documento',
  'Fecha de consulta',
  'Médico anestesista'
];

function getLastRow(rows){
  let i = 1;
  const rowLen = rows.length;
  lastRow = rows[rowLen - i];
  while(!lastRow['Número de documento']){
    i++;
    lastRow = rows[rowLen - i];
  }
  return lastRow;
}

module.exports = async () => {

  function parseColumnName(columnName){
    columnName = columnName
      .trim()
      .toLowerCase()
      .replace(".","")
      .replace(/ /g,"_")
      .replace(/__/g,"_")
      .replace(/\(|\)/g, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (columnName[0] === "["){
      columnName = columnName.replace("[","").replace("]","")
      return 'check_'.concat(columnName)
    }

    return columnName
  }

  let document = new GoogleSpreadsheet(patient);
  await document.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  })
  await document.loadInfo();
  let sheet = document.sheetsByIndex[0];
  let rows = await sheet.getRows();
  let lastRow = getLastRow(rows);
  let register = {};

  columns.forEach(column => {
    let cell = (lastRow[column] === undefined || lastRow[column] === '') ? false : lastRow[column]
    let col = parseColumnName(column)
    register[col] = cell
  });

  try {
    register = JSON.parse(JSON.stringify(register))
  } catch(e) {
    console.log(e);
  }

  return register;

}
