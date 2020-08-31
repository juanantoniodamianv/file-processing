'use strict'

const chalk = require('chalk');
const Queue = require('bull');
const fileProcessor = new Queue('Populate from spreadsheets to mongodb', process.env.REDIS_URL);
const fileProcessorPdfFiles = new Queue('Generating PDF files', process.env.REDIS_URL);
const populatePatientForm = require('../lib/populatePatientForm');
const generatePatientPdf = require('../lib/generatePatientPdf');

module.exports = function(app) {
  if (!app.isBoot) return;

  const PatientForm = app.models.PatientForm;

  fileProcessor.process(async (job, done) => {
    console.log(chalk.cyan(`\n[Bull] Launched: ${Date(Date.now()).toString()}`));
    console.log(chalk.cyan('[Bull] Populating spreadsheets to mongodb'));
    try {
      populatePatientForm(PatientForm);
    } catch(err) {
      console.log(chalk.red(new Error(`[Bull error]: ${err}`)));
    }

    done();
  });

  fileProcessor.add({},{
    repeat: {
      cron: '30 3 * * *'
    }
  });
  

  /* Generar PDF segun el modelo PatientForm */
  fileProcessorPdfFiles.process(async (job, done) => {
    console.log(chalk.cyan(`\n[Bull] Launched: ${Date(Date.now()).toString()}`));
    console.log(chalk.cyan('[Bull] Generatg pdf files'));
    try {
      generatePatientPdf(PatientForm);
    } catch(err) {
      console.log(chalk.red(new Error(`[Bull error]: ${err}`)));
    }

    done();
  });

  fileProcessorPdfFiles.add({ foo: 'bar' },{
    repeat: {
      cron: '35 3 * * *'
    }
  });
}