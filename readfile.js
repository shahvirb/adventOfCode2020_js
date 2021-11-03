function readFile (filepath) {
  const fs = require('fs')
  try {
    const data = fs.readFileSync(filepath, 'utf8')
    return data
  } catch (err) {
    console.error(err)
  }
}

function readLines (filepath) {
  return readFile(filepath).split('\n').map(s => s.trim())
}

module.exports = {
  readFile,
  readLines
}
