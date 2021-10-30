function readFile (filepath) {
  const fs = require('fs')
  try {
    const data = fs.readFileSync(filepath, 'utf8')
    return data
  } catch (err) {
    console.error(err)
  }
}

function readLines (filepath, perLineFunc = null) {
  let lines = readFile(filepath).split('\n')
  if (perLineFunc) lines = lines.map(perLineFunc)
  return lines
}

module.exports = {
  readFile: readFile,
  readLines: readLines
}
