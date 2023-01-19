'use strict'

const path = require('path')

const importDynamically = async (packageName) => {
  if (process.env.NODE_ENV === 'development') {
    switch (packageName) {
      case 'orbit-db/node_modules/orbit-db-cache/src/Cache.js':
        packageName = 'orbit-db-cache'
        break
      case 'multiformats/cjs/src/cid.js':
        packageName = 'multiformats/cid'
        break
      case 'orbit-db-storage-adapter/src/index.js':
        packageName = 'orbit-db-storage-adapter'
        break
      default:
        packageName = packageName.split('/dist')[0]
    }
    return await eval(`import('${packageName}')`)
  } else {
    let externalPackagePath = null
    if (process.platform === 'linux') {
      const resourcesPath = process.env.APPDIR
      externalPackagePath = path.join(resourcesPath, `resources/app/node_modules/@quiet/backend/node_modules/${packageName}`)
    } else
    if (process.platform === 'darwin') {
      const resourcesPath = process.env._.split('/MacOS')[0]
      externalPackagePath = path.join(resourcesPath, `Resources/app/node_modules/@quiet/backend/node_modules/${packageName}`)
    } else {
      // mobile platforms
      externalPackagePath = `../../node_modules/${packageName}`
    }
    return eval(`import('${externalPackagePath}')`)
  }
}

module.exports = importDynamically