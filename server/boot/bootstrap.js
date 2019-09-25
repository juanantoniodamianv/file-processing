"use strict"

module.exports = async function (app) {
  const Storage = app.models.Storage

  let containers = [
    "customers",
    "tsv_files"
  ]

  Storage.getContainers((err, existing) => {
    for (let container of containers) {
      if (!existing.some((ex) => ex.name == container)) {
        Storage.createContainer({
          name: container
        }, (err) => {})
      }
    }
  })
  
}