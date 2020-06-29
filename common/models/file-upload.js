'use strict';
const multiparty = require('multiparty');
const { join, extname } = require('path');
const { readFileSync } = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({ accessKeyId: process.env.AWS_KEY_ID, secretAccessKey: process.env.AWS_KEY });
const awsS3UrlDefault = "https://forms-example.s3.us-east-2.amazonaws.com/";
const moment = require('moment');

const populatePatientForm = require('../../server/lib/populatePatientForm');
const generatePatientPdf = require('../../server/lib/generatePatientPdf');

module.exports = function(Fileupload) {
  /**
  * Helper method which takes the request object and returns a promise with a file.
  */
  const getFileFromRequest = (req) => new Promise((resolve, reject) => {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      const file = files['file'];
      if (!file) reject('File was not found in form data.');
      else resolve(file);
    });
  });


  /**
  * Helper method which takes the request object and returns a promise with the AWS S3 object details.
  */
  const uploadFileToS3 = (file, options = {}, folderName) => {
    const buffer = readFileSync(file.path);
    const fileName = options.name || String(Date.now());
    const extension = extname(file.path);

    return new Promise((resolve, reject) => {
      return s3.upload({
        Bucket: 'forms-example', 
        ACL: 'public-read',
        Key: join(folderName, `${fileName}${extension}`),
        Body: buffer
      }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };
  
  Fileupload.uploadPatientImage = async (req, fechaDeConsulta, numeroDeDocumento, cuitMedicoAnestesista, apellidoYNombre) => {
    const PatientHeaderData = Fileupload.app.models.PatientHeaderData;
    const PatientHeaderDataFileUpload = Fileupload.app.models.PatientHeaderDataFileUpload;

    /* Transform "AGUERO ADRIAN ALFREDO 20115833007" to "20115833007" */
    cuitMedicoAnestesista = cuitMedicoAnestesista.split(' ');
    cuitMedicoAnestesista = cuitMedicoAnestesista[cuitMedicoAnestesista.length - 1];

    let patientHeaderData = await PatientHeaderData.create({
      fechaDeConsulta, numeroDeDocumento, cuitMedicoAnestesista
    })

    const files = await getFileFromRequest(req);
    let fileUploads = []
    
    for (const file of files) {
      let { Location, ETag, Bucket, Key } = await uploadFileToS3(file, {}, `${numeroDeDocumento}/images`);
      let fileUpload = await Fileupload.create({
        link: Location,
        etag: ETag,
        bucket: Bucket,
        image: Key
      });
      
      PatientHeaderDataFileUpload.create({
        patientHeaderDataId: patientHeaderData.id,
        fileUploadId: fileUpload.id
      })

      fileUploads.push(fileUpload);
    }

    return fileUploads;
  };

  Fileupload.remoteMethod('uploadPatientImage', {
    accepts: [
      { arg: 'req', type: 'object', required: true, http: { source: 'req' }},
      { arg: 'date', type: 'string', required: true, http: { source: 'query' } },
      { arg: 'documentNumber', type: 'string', required: true, http: { source: 'query' }},
      { arg: 'doctor', type: 'string', required: true, http: { source: 'query' } },
      { arg: 'fullName', type: 'string' }
    ],
    returns: { root: true, type: 'object' },
    http: { path: '/file-upload', verb: 'post' }
  });

  Fileupload.getFiles = async (documentNumber) => {
    let params = {
      Bucket: "forms-example", 
      MaxKeys: 20,
      Prefix: `${documentNumber}/images`
    };

    return new Promise((resolve, reject) => {
      return s3.listObjectsV2(params, (err, data) => {
        if (err) console.log(err, err.stack);
        let files = [];
        for (const file of data.Contents) {
          files.push({'url': awsS3UrlDefault + file.Key}); 
        }
        return resolve(files);
      })
    })
  };

  Fileupload.remoteMethod('getFiles', {
    accepts: [
      { arg: 'documentNumber', type: 'string', required: true, http: { source: 'query' } }
    ],
    returns: { root: true, type: 'array' },
    http: { path: '/get-files', verb: 'get' }
  });

  Fileupload.getPatientFiles = async () => {

    const PatientForm = Fileupload.app.models.PatientForm;

    return new Promise((resolve, reject) => {
      return populatePatientForm(PatientForm).then(() => {
        generatePatientPdf(PatientForm).then(files => {
          console.log(files)
          resolve(files);
        })
      })
    })
  }

  Fileupload.remoteMethod('getPatientFiles', {
    /* accepts: [
      { arg: 'date', type: 'string', required: true, http: { source: 'query' } }
    ], */
    returns: { root: true, type: 'array' },
    http: { path: '/get-patient-files', verb: 'get' }
  });

};
