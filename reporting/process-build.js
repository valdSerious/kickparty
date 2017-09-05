const fs = require('fs')

fs.readFile('./reporting/build-result.json', (err, data) => {
  if (err) throw err
  processFile(data)
})

function processFile (content) {
  const json = JSON.parse(content)
  const totalSize = json.assets[0].size
  const modules = json.modules

  const processedModules = []

  modules.forEach((module) => {
    processedModules.push({
      id: module.id,
      name: formatName(module.name),
      sizeString: formatSize(module.size),
      size: module.size,
      percent: getPercentOf(module.size, totalSize)
    })
  })

  const sortedArray = sortArray(processedModules)
  const formattedModules = JSON.stringify(sortedArray, null, 2)

  fs.writeFile('./reporting/webpack-summary.json', formattedModules, (err) => {
    if (err) throw err
    console.log('json written')
  })
}

function formatName (name) {
  return name.replace('./~/', '')
}

function formatSize (size) {
  if ((size / 1048576) > 1) {
    const mbSize = (~~((size / 1048576) * 100)) / 100
    return `${mbSize} MB`
  } else if ((size / 1024) > 1) {
    const kbSize = (~~((size / 1024) * 100)) / 100
    return `${kbSize} KB`
  } else {
    return `${size} bytes`
  }
}

function sortArray (array) {
  return array.sort((a, b) => {
    return a.size - b.size
  })
}

function getPercentOf (size, totalSize) {
  const roundedSize = Math.round((size / totalSize) * 100) / 100
  return `${roundedSize}%`
}
