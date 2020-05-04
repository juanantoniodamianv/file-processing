'use strict'
const { GoogleSpreadsheet } = require('google-spreadsheet')
const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_DOC_ID)

const columns = [
  'Marca temporal',
  'Apellido y Nombre',
  'Número de Documento',
  'Fecha',
  'Médico Anestesista',
  'Obra Social',
  'Número de Afiliado',
  '[Insuf. Cardíaca]',
  '[Arritmias]',
  '[Hipertensión]',
  '[Hipotensión]',
  '[Tos]',
  '[Expectoración]',
  '[Asma]',
  '[Hepatopatía]',
  '[Coagulopatía]',
  '[Hipertiroidismo]',
  '[Hipotiroidismo]',
  '[Nefropatía]',
  '[Convulsiones]',
  '[Hipertermia]',
  '[EPOC]',
  '[Fuma]',
  '[Alcohol]',
  '[Drogas]',
  '[Alergias]',
  '[Anemia]',
  '[Diabetes]',
  '[Glaucoma]',
  '[Desnutrido]',
  '[Deshidratado]',
  '[Distendido]',
  '[Shock]',
  '[Inconsciente]',
  '[Obnubilado]',
  'Especificaciones',
  '[Diuréticos]',
  '[Digtálicos]',
  '[Beta Bloqueantes]',
  '[Antihipertensivos]',
  '[Antihistamínicos]',
  '[Corticoides]',
  '[Insulina]',
  '[Hipotensores]',
  '[Anticoagulantes]',
  '[Antibióticos]',
  '[Ansiolíticos]',
  '[Hipoglucemiantes]',
  '[Anticonvulcionantes]',
  'Cirugías Anteriores',
  'Observaciones',
  'Medicamentos y Dosis',
  'Apertura Boca (cm)',
  'Piezas Dentarias',
  'Prótesis Inferior  Superior',
  'Maxilares',
  'Fauces'
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

  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  })
  
  await doc.loadInfo()
  console.log(doc.title)
  let sheet = doc.sheetsByIndex[0]

  let rows = await sheet.getRows()

  console.log(`Cantidad de filas: ${rows.length}`)
  
  let registers = []

  rows.forEach(row => {
    let register = {}
    columns.forEach((column, i) => {
      let cell = (row[column] === undefined || row[column] === '') ? false : row[column]
      let col = parseColumnName(column)
      register[col] = cell
    });
    registers.push(register)
  })
  
  try {
    registers = JSON.parse(JSON.stringify(registers))
  } catch(e) {
    console.log(e);
  }

  return registers
}