import path from 'path'
import tsconfig from './tsconfig.json'

const paths = tsconfig.compilerOptions.paths

const alias: Record<string, string> = {}

const removerChars = (list: string[], chars: string[]) => {
  return list.filter((l) => {
    return !chars.includes(l)
  })
}

Object.entries(paths).forEach(([key, value]) => {
  const charsToRemove = ['*']
  const normalizeKey = removerChars(key.split('/'), charsToRemove).join('/')
  const normalizePath = removerChars(value[0].split('/'), charsToRemove)

  alias[normalizeKey] = path.resolve(__dirname, ...normalizePath)
})

export { alias }
