import { ResolveOptions } from 'webpack'
import path from 'path'

export const alias: ResolveOptions['alias'] = {
  '@components': path.resolve(__dirname, 'src', 'components')
}
