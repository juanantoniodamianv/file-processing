'use strict'
const generatePdf = require('./generatePdf');
const moment = require('moment');

module.exports = async (PatientForm) => {
  let date = moment().subtract(1, 'days').format("DD-MM-YYYY");

  let patients = await PatientForm.find({ where: { pdfHasCreated: false, fechaDeConsulta: date }});
  let FileUpload = PatientForm.app.models.FileUpload;

  const files = patients.map(async (patient) => {
    let filename = `DNI_${patient.numeroDeDocumento}_${patient.fechaDeConsulta.split('-').join('')}.pdf`;
    let fileUrls = await FileUpload.getFiles(patient.numeroDeDocumento);
    //let fileUrls = null;
    let file = await generatePdf(patient, 'pdf-patient-v1', filename, fileUrls);
    return file;
  })

  return Promise.all(files);
}