import * as fs from 'fs'
import * as path from 'path'

function _checkIfDirExists(cwd, dirName) {
  let resolve = null
  let reject = null

  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })

  const fullPath = path.join(cwd, dirName)

  fs.access(fullPath, function (error) {
    if (error) {
      reject(false)
    } else {
      resolve(true)
    }
  })

  return promise
}

async function checkIfDirExists(cwd, dirName) {
  let status

  try {
    status = await _checkIfDirExists(cwd, dirName)
  } catch (err) {
    status = false
  }

  return status
}

export {
  checkIfDirExists
}
