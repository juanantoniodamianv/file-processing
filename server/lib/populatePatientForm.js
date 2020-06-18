'use strict'
const { GoogleSpreadsheet } = require('google-spreadsheet');
const patient = process.env.SPREADSHEET_DOC_ID_PATIENT;

module.exports = async (PatientForm) => {

  let document = new GoogleSpreadsheet(patient)
  
  await document.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  })

  await document.loadInfo()

  /* Get the first sheet */
  let sheet = document.sheetsByIndex[0]
  /* Get rows of the sheet */
  let rows = await sheet.getRows()

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

    await PatientForm.findOrCreate({ where: { 
      and: [
        { fechaDeConsulta: fechaDeConsulta },
        { numeroDeDocumento: numeroDeDocumento },
        { cuitMedicoAnestesista: cuitMedicoAnestesista }
      ]}
    }, {
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
      limitacionParaMoverElCuello
    });

  }
}