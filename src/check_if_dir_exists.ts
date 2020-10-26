const fs = require('fs')

function _checkIfDirExists(dirName) {
  let resolve = null
  let reject = null

  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })

  fs.access(dirName, function (error) {
    if (error) {
      reject(false)
    } else {
      resolve(true)
    }
  })

  return promise
}

async function checkIfDirExists(dirName) {
  try {
    await _checkIfDirExists(dirName)
    return true
  } catch (err) {
    return false
  }
}

export {
  checkIfDirExists
}
