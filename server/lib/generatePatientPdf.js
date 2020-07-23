'use strict'
const generatePdf = require('./generatePdf');
const moment = require('moment');

module.exports = async (PatientForm) => {
  let date = moment().subtract(1, 'days').format("DD-MM-YYYY");   // Yesterday
  let date_1 = moment().subtract(2, 'days').format("DD-MM-YYYY"); // Yesterday - 1
  let date_2 = moment().subtract(3, 'days').format("DD-MM-YYYY"); // Yesterday - 2
  let date_3 = moment().subtract(4, 'days').format("DD-MM-YYYY"); // Yesterday - 3
  let date_4 = moment().subtract(5, 'days').format("DD-MM-YYYY"); // Yesterday - 4

  let patients = await PatientForm.find({ where: { 
    pdfHasCreated: false, 
    or: [
      { fechaDeConsulta: date },
      { fechaDeConsulta: date_1 },
      { fechaDeConsulta: date_2 },
      { fechaDeConsulta: date_3 },
      { fechaDeConsulta: date_4 },
    ]
  }});

  let FileUpload = PatientForm.app.models.FileUpload;

  const files = patients.map(async (patient) => {
    console.log(`Generate PDF to ${patient.apellidoYNombre} - ${patient.numeroDeDocumento} - ${patient.fechaDeConsulta}`)
    let filename = `DNI_${patient.numeroDeDocumento}_${patient.fechaDeConsulta.split('-').join('')}.pdf`;
    let fileUrls = await FileUpload.getFiles(patient.numeroDeDocumento);
    let file = await generatePdf(patient, 'pdf-patient-v1', filename, fileUrls);
    await patient.updateAttribute('pdfHasCreated', true);
    return file;
  })

  return Promise.all(files);
}