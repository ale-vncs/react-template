import * as fs from 'fs'
import { resolve } from 'path'

export const appDirectory = fs.realpathSync(process.cwd())
export const resolveApp = (relativePath: string) => {
  return resolve(appDirectory, relativePath)
}

export const path = {
  webpackCache: resolveApp('node_modules/.cache'),
  eslintCache: resolveApp('node_modules/.cache/.eslintcache'),
  tsBuildInfoFile: resolveApp('node_modules/.cache/tsconfig.tsbuildinfo'),
  appPath: resolveApp('.'),
  appSrc: resolveApp('src')
}
