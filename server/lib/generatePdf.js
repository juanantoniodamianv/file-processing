'use strict'

const pdf = require('html-pdf')
const ejs = require('ejs')
const uploadFileToS3 = require('./uploadToAwsS3')

module.exports = async () => {

  let html = await ejs.renderFile('server/views/forms/pdf-v1.ejs', {

  })

  let file = await (new Promise((resolve, reject) => {
    let filename = `${Date.now()}.pdf`

    pdf.create(html, {
      type: 'pdf',
      format: 'A4',
      orientation: 'portrait'

    }).toBuffer((err, buffer) => {
      if (err) return reject(err)
      uploadFileToS3(buffer, filename)
      console.log('This is a buffer:', Buffer.isBuffer(buffer));
      resolve(buffer)
    })
  }))

  return file

}