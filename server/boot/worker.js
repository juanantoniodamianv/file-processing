'use strict'

const chalk = require('chalk');
const Queue = require('bull');
//const fileProcessor = new Queue('Processing tsv file', process.env.REDIS_URL);
const fileProcessor = new Queue('Populate from spreadsheets to mongodb', process.env.REDIS_URL);
const fileProcessorPdfFiles = new Queue('Generating PDF files', process.env.REDIS_URL);
const fs = require('fs');
const path = require('path');
const processFile = require('../lib/processFile');

const populatePatientForm = require('../lib/populatePatientForm');
const generatePatientPdf = require('../lib/generatePatientPdf');

module.exports = function(app) {
  if (!app.isBoot) return;

  /* ----------------------------------------------------------------------------------------
  const Metric = app.models.Metric;

  fileProcessor.process(async (job, done) => {
    console.log(chalk.cyan(`\n[Bull] Launched: ${Date(Date.now()).toString()}`));
    console.log(chalk.cyan('[Bull] Checking for new tsv files in ./storage/tsv_files'));
    try {
      let fileNames = await getFileName();
      fileNames = fileNames.map(name => name.slice(0,-4))
      console.log(chalk.cyan(`${fileNames.length} file(s) exists in ./storage/tsv_files directory.`));
      var countNewFiles = 0;
      for (const fileName of fileNames) {
        let metric = await Metric.findOne({ where: { fileName }});
        if (!metric) {
          countNewFiles++;
          processFile(Metric, fileName);
        }
      }
      console.log(chalk.green(`${countNewFiles} new files has been processing now.`));
    } catch(err) {
      console.log(chalk.red(new Error(`[Bull error]: ${err}`)));
    }

    done();
  });
  
  let getFileName = () => {
    let filePath = path.join(__dirname, "../../storage/tsv_files");
    return new Promise((resolve, reject) => {
      fs.readdir(filePath, (err, files) => {
        err ? reject(err) : resolve(files);
      });
    });
  } 
    
----------------------------------------------------------------------------------------*/

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
      cron: '12 11 * * *'
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
      cron: '15 11 * * *'
    }
  });
}