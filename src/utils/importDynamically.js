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
    const resourcesPath = process.env.APPDIR
    const externalPackagePath = path.join(resourcesPath, `resources/app/node_modules/@quiet/backend/node_modules/${packageName}`)
    return await eval(`import('${externalPackagePath}')`)
  }
}

module.exports = importDynamically