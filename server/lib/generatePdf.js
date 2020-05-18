'use strict'

const pdf = require('html-pdf')
const ejs = require('ejs')
const path = require('path')

module.exports = async () => {

  let html = await ejs.renderFile('server/views/forms/pdf-v1.ejs', {

  })

  let file = await (new Promise((resolve, reject) => {
    let filename = 'storage/forms/name.pdf'

    pdf.create(html, {
      type: 'pdf',
      format: 'A4',
      orientation: 'portrait'

    }).toFile(path.join(__dirname, '../../' + filename), (err, file) => {
      if (err) return reject(err)
      resolve(filename)
    })
  }))

  return file

}