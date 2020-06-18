'use strict'
const generatePdf = require('./generatePdf');

module.exports = async (PatientForm) => {
  let patients = await PatientForm.find({ where: { pdfHasCreated: false }});

  for (const patient of patients) {
    let filename = `DNI_${patient.numeroDeDocumento}_${patient.fechaDeConsulta.split('/').join('')}.pdf`;
    await generatePdf(patient, 'pdf-patient-v1', filename);
  }
}