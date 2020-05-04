'use strict'

//const spreadsheet = require('../../../server/lib/spreadsheetsParser')
const columns = [
  { 
    label: 'Marca temporal',
    field: '',
    sort: 'asc',
    width: 150
  },
  { 
    label: 'Apellido y Nombre',
    field: '',
    sort: 'asc',
    width: 150
  },
  { 
    label: 'Número de Documento',
    field: '',
    sort: 'asc',
    width: 150
  },
  { 
    label: 'Fecha',
    field: '',
    sort: 'asc',
    width: 150
  },
  { 
    label: 'Médico Anestesista',
    field: '',
    sort: 'asc',
    width: 150
  },
  { 
    label: 'Obra Social',
    field: '',
    sort: 'asc',
    width: 150
  },
  { 
    label: 'Número de Afiliado',
    field: '',
    sort: 'asc',
    width: 150
  },
  { title: '[Insuf. Cardíaca]'},
  { title: '[Arritmias]'},
  { title: '[Hipertensión]'},
  { title: '[Hipotensión]'},
  { title: '[Tos]'},
  { title: '[Expectoración]'},
  { title: '[Asma]'},
  { title: '[Hepatopatía]'},
  { title: '[Coagulopatía]'},
  { title: '[Hipertiroidismo]'},
  { title: '[Hipotiroidismo]'},
  { title: '[Nefropatía]'},
  { title: '[Convulsiones]'},
  { title: '[Hipertermia]'},
  { title: '[EPOC]'},
  { title: '[Fuma]'},
  { title: '[Alcohol]'},
  { title: '[Drogas]'},
  { title: '[Alergias]'},
  { title: '[Anemia]'},
  { title: '[Diabetes]'},
  { title: '[Glaucoma]'},
  { title: '[Desnutrido]'},
  { title: '[Deshidratado]'},
  { title: '[Distendido]'},
  { title: '[Shock]'},
  { title: '[Inconsciente]'},
  { title: '[Obnubilado]'},
  { title: 'Especificaciones'},
  { title: '[Diuréticos]'},
  { title: '[Digtálicos]'},
  { title: '[Beta Bloqueantes]'},
  { title: '[Antihipertensivos]'},
  { title: '[Antihistamínicos]'},
  { title: '[Corticoides]'},
  { title: '[Insulina]'},
  { title: '[Hipotensores]'},
  { title: '[Anticoagulantes]'},
  { title: '[Antibióticos]'},
  { title: '[Ansiolíticos]'},
  { title: '[Hipoglucemiantes]'},
  { title: '[Anticonvulcionantes]'},
  { title: 'Cirugías Anteriores'},
  { title: 'Observaciones'},
  { title: 'Medicamentos y Dosis'},
  { title: 'Apertura Boca (cm)'},
  { title: 'Piezas Dentarias'},
  { title: 'Prótesis Inferior  Superior'},
  { title: 'Maxilares'},
  { title: 'Fauces'}
]

$(document).ready(function() {
  $('#example').DataTable({
    columns: columns
  })
})

