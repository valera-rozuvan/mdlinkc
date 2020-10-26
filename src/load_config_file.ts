import * as path from 'path'

async function loadConfigFile(cwd, configName) {
  const shortPath = `configs/${configName}.js`
  const fullPath = path.join(cwd, shortPath)

  try {
    return require(fullPath)
  } catch (err) {
    return null
  }
}

export {
  loadConfigFile
}
