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
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  })
  
  await doc.loadInfo()
  console.log(doc.title)
  let sheet = doc.sheetsByIndex[0]

  let rows = await sheet.getRows()

  console.log(`Cantidad de filas: ${rows.length}`)
  
  rows.forEach(row => {
    columns.forEach(column => {
      let cell = (row[column] == 'No' || row[column] === undefined || row[column] === '') ? false : row[column]
      console.log(cell)
    });
  })
  

  return
}