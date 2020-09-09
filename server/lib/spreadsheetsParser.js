'use strict'
const { GoogleSpreadsheet } = require('google-spreadsheet');
const moment = require('moment');
const patient = process.env.SPREADSHEET_DOC_ID_PATIENT;
const doctor = process.env.SPREADSHEET_DOC_ID_DOCTOR;

const columns = [
  'Marca temporal',
  'Apellido y nombre',
  'Número de documento',
  'Fecha de consulta',
  'Médico anestesista',
  'Obra social',
  'Número de afiliado',
  'Form Response Edit URL',
  'Form Response Edit URL M'
]
 
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

  let eightDaysAgoFromToday = moment(new Date()).add(-8,'days');
  eightDaysAgoFromToday = moment(eightDaysAgoFromToday);

  let concatArray = []
  for (const doc of [doctor, patient]) {
    let document = new GoogleSpreadsheet(doc)
    console.log('entre')
    await document.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    })

    await document.loadInfo()
    console.log(`Processing file: ${document.title}`)

    let sheet = document.sheetsByIndex[0]
    let rows = await sheet.getRows()
    let registers = []
    console.log(`Rows count to this file: ${rows.length}`)

    rows.forEach(row => {
      let register = {}
      columns.forEach((column, i) => {
        let cell = (row[column] === undefined || row[column] === '') ? false : row[column]
        let col = parseColumnName(column)
        register[col] = cell
      });

      let actual = register[parseColumnName('Fecha de consulta')] 
      if (typeof actual !== 'string') {
        return
      }
      actual = actual.split('/').reverse().join('/')
      actual = moment(actual)
      if (!moment(actual).isAfter(eightDaysAgoFromToday, undefined, '[]')) return;
      registers.push(register)
    })
    
    concatArray.push(registers)
  }

  concatArray[1].map(patient => {
    let result = concatArray[0].findIndex(doctor => {
      return patient.numero_de_documento === doctor.numero_de_documento && patient.fecha_de_consulta === doctor.fecha_de_consulta && patient.medico_anestesista === doctor.medico_anestesista
    })
    if (result != -1) patient.form_response_edit_url_m = concatArray[0][result].form_response_edit_url_m
  })
  
  try {
    concatArray = JSON.parse(JSON.stringify(concatArray[1]))
  } catch(e) {
    console.log(e);
  }

  return concatArray
}