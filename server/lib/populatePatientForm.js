'use strict'
const { GoogleSpreadsheet } = require('google-spreadsheet');
const moment = require('moment');
const patient = process.env.SPREADSHEET_DOC_ID_PATIENT;
const doctor = process.env.SPREADSHEET_DOC_ID_DOCTOR;

module.exports = async (PatientForm) => {

  let document = new GoogleSpreadsheet(patient)
  let doctorDocument = new GoogleSpreadsheet(doctor)
  
  await document.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  })

  await document.loadInfo()

  await doctorDocument.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  })

  await doctorDocument.loadInfo()

  /* Get the first sheet */
  let sheet = document.sheetsByIndex[0]
  let doctorSheet = doctorDocument.sheetsByIndex[0]
  /* Get rows of the sheet */
  let rows = await sheet.getRows()
  let doctorRows = await doctorSheet.getRows()

  //TODO verificar esto...
  for (const row of rows) {

    let marcaTemporal = row["Marca temporal"]
    let fechaDeConsulta = row["Fecha de consulta"].split('/').map(e => (e.length === 1) ? `0${e}` : e).join('-');
    let apellidoYNombre = row["Apellido y nombre"]
    let numeroDeDocumento = row["Número de documento"]
    let obraSocial = row["Obra social"]
    let numeroAfiliado = row["Número de afiliado"]
    let edad = row["Edad"]
    let peso = row["Peso"]
    let medicoDeCabecera = row["Médico de cabecera"]
    let medicoAnestesista = row['Médico anestesista'].split(' ');
    let cuitMedicoAnestesista = medicoAnestesista[medicoAnestesista.length - 1];
    medicoAnestesista.pop();
    medicoAnestesista = medicoAnestesista.join(' ');
    let cirugiaOProcedimientoARealizar = row["Cirugía o procedimiento a realizar"]
    let tosCatarroCongestionOFiebre = row["[Tos, catarro, congestion o fiebre]"] === 'Si'
    let cirugiasAnteriores = row["Cirugias anteriores"]
    let antecedentesDeAlgunaEnfermedad = row["Antecedentes de alguna enfermedad"]
    let arritmias = row["[Arritmias]"] === 'Si'
    let asma = row["[Asma]"] === 'Si'
    let diabetes = row["[Diabetes]"] === 'Si'
    let epoc = row["[EPOC]"] === 'Si'
    let escoliosis = row["[Escoliosis]"] === 'Si'
    let fuma = row["[Fuma]"] === 'Si'
    let hipertiroidismo = row["[Hipertiroidismo]"] === 'Si'
    let hipotiroidismo = row["[Hipotiroidismo]"] === 'Si'
    let presionArterial = row["[Presión arterial]"] === 'Si'
    let cuandoDejoDeFumar = row["¿Cuándo dejó de fumar?"]
    let problemasRenales = row["¿Problemas renales?"]
    let otrasEnfermedades = row["Otras enfermedades"]
    let medicacionHabitual = row["Detallar medicación habitual (nombre y hora)"]
    let aas = row["¿Recibe medicación para la sangre? [AAS]"] === 'Si'
    let sintrom = row["¿Recibe medicación para la sangre? [Sintrom]"] === 'Si'
    let clexane = row["¿Recibe medicación para la sangre? [Clexane]"] === 'Si'
    let alergiaAMedicamentos = row["¿Alergia a medicamentos, cuales?"]
    let amoxicilina = row["¿Tomó alguna vez sin inconvenientes? [Amoxicilina]"] === 'Si'
    let cefaexina = row["¿Tomó alguna vez sin inconvenientes? [Cefalexina]"] === 'Si'
    let diclofenac = row["¿Tomó alguna vez sin inconvenientes? [Diclofenac]"] === 'Si'
    let dipirona = row["¿Tomó alguna vez sin inconvenientes? [Dipirona]"] === 'Si'
    let ibuprofeno = row["¿Tomó alguna vez sin inconvenientes? [Ibuprofeno]"] === 'Si'
    let pescado = row["Alergia a algún alimento [Pescado]	"] === 'Si'
    let huevo = row["Alergia a algún alimento [Huevo]	"] === 'Si'
    let alergiaAOtroAlimento = row["Alergia a otro alimento"]
    let aperturaBucalNormal = row["¿Apertura bucal es normal?	"]
    let protesisDental = row["¿Utiliza prótesis dental?"]
    let limitacionParaMoverElCuello = row["¿Alguna limitación para mover el cuello?"]

    let date = moment().subtract(1, 'days').format("DD-MM-YYYY");
    if (date != fechaDeConsulta) {
      // Ej. Fecha de hoy: 29-06-2020
      // Se procesan unicamente las de fecha 28-06-2020
      continue;
    }

    let doctorRow = existRowInDoctorSpreadsheet(numeroDeDocumento, doctorRows)

    if (doctorRow) {
      let [asa, observaciones, alerta] = doctorRow

      let patient = await PatientForm.findOne({ where: { 
        and: [
          { numeroDeDocumento: numeroDeDocumento }
        ]}
      });

      if (patient) {
        await patient.updateAttributes({
          marcaTemporal,
          fechaDeConsulta,
          apellidoYNombre,
          obraSocial,
          numeroAfiliado,
          numeroAfiliado,
          edad,
          peso,
          medicoDeCabecera,
          medicoAnestesista,
          cuitMedicoAnestesista,
          cirugiaOProcedimientoARealizar,
          tosCatarroCongestionOFiebre,
          cirugiasAnteriores,
          antecedentesDeAlgunaEnfermedad,
          arritmias,
          asma,
          diabetes,
          epoc,
          escoliosis,
          fuma,
          hipertiroidismo,
          hipotiroidismo,
          presionArterial,
          cuandoDejoDeFumar,
          problemasRenales,
          otrasEnfermedades,
          medicacionHabitual,
          aas,
          sintrom,
          clexane,
          alergiaAMedicamentos,
          amoxicilina,
          cefaexina,
          diclofenac,
          dipirona,
          ibuprofeno,
          pescado,
          huevo,
          alergiaAOtroAlimento,
          aperturaBucalNormal,
          protesisDental,
          limitacionParaMoverElCuello,
          asa,
          observaciones,
          alerta
        });
      } else {
        await PatientForm.create({
          marcaTemporal,
          fechaDeConsulta,
          apellidoYNombre,
          numeroDeDocumento,
          obraSocial,
          numeroAfiliado,
          numeroAfiliado,
          edad,
          peso,
          medicoDeCabecera,
          medicoAnestesista,
          cuitMedicoAnestesista,
          cirugiaOProcedimientoARealizar,
          tosCatarroCongestionOFiebre,
          cirugiasAnteriores,
          antecedentesDeAlgunaEnfermedad,
          arritmias,
          asma,
          diabetes,
          epoc,
          escoliosis,
          fuma,
          hipertiroidismo,
          hipotiroidismo,
          presionArterial,
          cuandoDejoDeFumar,
          problemasRenales,
          otrasEnfermedades,
          medicacionHabitual,
          aas,
          sintrom,
          clexane,
          alergiaAMedicamentos,
          amoxicilina,
          cefaexina,
          diclofenac,
          dipirona,
          ibuprofeno,
          pescado,
          huevo,
          alergiaAOtroAlimento,
          aperturaBucalNormal,
          protesisDental,
          limitacionParaMoverElCuello,
          asa,
          observaciones,
          alerta
        });
      }

    }

  }

  function existRowInDoctorSpreadsheet(numeroDeDocumento, doctorRows) {
    for (const row of doctorRows) {
      if (row["Número de documento"] == numeroDeDocumento) {
        return [
          row["ASA"],
          row["Observaciones"],
          row["Alerta"]
        ]
      }
    }
    return false;
  }

  return true;
}