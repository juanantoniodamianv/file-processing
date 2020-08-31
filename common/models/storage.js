'use strict';

//const fileImporter = require('../../server/lib/fileImporter');

module.exports = function(Storage) {
  /* Storage.afterRemote('upload', async (ctx, res) => {
    const file = res.result.files.file[0];
    let importedRows;

    try {
      importedRows = await fileImporter(Storage, file)
    } catch (e) {
      throw e;
    }

    ctx.result.importedRows = importedRows;
  }); */
};
