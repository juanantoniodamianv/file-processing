'use strict'

const pdf = require('html-pdf')
const ejs = require('ejs')
const uploadFileToS3 = require('./uploadToAwsS3')

module.exports = async (data, ejsFile, filename = `${Date.now()}.pdf`, fileUrls = null) => {

  let html = await ejs.renderFile(`server/views/forms/${ejsFile}.ejs`, { data, fileUrls })

  let file = await (new Promise((resolve, reject) => {

    pdf.create(html, {
      type: 'pdf',
      format: 'A4',
      orientation: 'portrait',
      timeout: '100000'
    }).toBuffer(async (err, buffer) => {
      if (err) return reject(err)
      let { Location, Key } = await uploadFileToS3(buffer, filename)
      console.log(Location, Key)
      resolve({ 
        name: Key,
        url: Location
      })
    })
  }))

  return file

}