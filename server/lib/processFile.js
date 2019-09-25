'use strict';

const path = require('path')
const parser = require('csv-parse')
const fs = require('fs')

const columns = [
  { 'name': 'userId' },
  { 'name': 'segments' },
  { 'name': 'country' }
];

let loadFile = (Metric, fileName) => {
  let filePath = path.join(__dirname, "../../storage/tsv_files", `${fileName}.tsv`);
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, async (err, data) => {
      if (err) {
        await Metric.create({ fileName: fileName, status: 'failed', started:  Date.now(), finished:  Date.now(), message: `Cannot read file. Most likely it doesn't exist.` });
        return reject({ message: `Cannot read file. Most likely it doesn't exist.`, fileName: fileName, data: null });
      }
      let options = { 
        columns: columns.map(c => c.name),
        delimiter: '\t'
      };
      parser(data, options, async (err, rows) => {
        if (err) {
          await Metric.create({ fileName: fileName, status: 'failed', started:  Date.now(), finished:  Date.now(), message: `Cannot parse file. Check if the file is a valid tsv.` });
          return reject({ message: 'Cannot parse file. Check if the file is a valid tsv.', fileName: fileName, data: null });
        } else {
          let metric = await Metric.create({ fileName: fileName, status: 'started', started:  Date.now() });
          resolve({message: 'Retrieved succesfully', fileName: fileName, metricId: metric.id, data: rows});
        }
      })
    })
  });
}

module.exports = async (Metric, fileName) => {
  const Segment = Metric.app.models.Segment;
  const Unique = Metric.app.models.Unique;
  try {
    /* Find metric by file name */
    var metric = await Metric.findOne({ where: { fileName: fileName }});
    /* If not exist: find file, read, parse and create if is valid tsv */
    if (!metric) {
      let rows = await loadFile(Metric, fileName);
      for (const row of rows.data) {
        let segments = row.segments.split(',').map(Number);
        for (const segment of segments) {
          let seg = await Segment.findOrCreate({ 
            where: { and: [{segmentId: segment}, {metricId: rows.metricId}]}
          }, { segmentId: segment, metricId: rows.metricId }); 

          let unique = await Unique.findOne({ where: { 
            and: [
              { country: row.country },
              { segmentId: seg[0].id }
            ]}
          });
          if (unique) {
            await unique.updateAttribute('count', unique.count + 1);
          } else {
            await Unique.create({ country: row.country, segmentId: seg[0].id });
          }
        }; 
      } 
    }
  } catch (e) {
    console.log(e);
  }

  return metric;
}