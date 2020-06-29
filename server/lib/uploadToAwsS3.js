const AWS = require('aws-sdk');
const s3 = new AWS.S3({ accessKeyId: process.env.AWS_KEY_ID, secretAccessKey: process.env.AWS_KEY });

/**
 * Method to upload a file in AWS S3 bucket
 * @param {*} file 
 * @param {*} filename 
 * @param {*} bucketS3 default 'forms-example'
 * @param {*} acl default 'public-read'
 */
const uploadFileToS3 = (file, filename, bucketS3 = 'forms-example', acl = 'public-read') => {
  let params = { Bucket: bucketS3, ACL: acl, Key: filename, Body: file }
  return new Promise((resolve, reject) => {
    return s3.upload(params, function(err, result) {
      if (err) reject(err);
      resolve(result);
    })
  })
}

module.exports =  uploadFileToS3