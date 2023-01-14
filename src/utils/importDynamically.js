export async function importDynamically(packageName){
    if (process.env.APPIMAGE) {
      const resourcesPath = process.env.APPDIR
      const externalPackagePath = path.join(resourcesPath, `resources/node_modules/${packageName}`)
      return await eval(`import('${externalPackagePath}')`)
    } else {
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
  }
  }