import {builtinModules} from 'module';
import {dependencies} from './package.json';

export default {
  input: 'src/index.mjs',
  output: {
    file: 'dist/index.cjs',
    format: 'cjs',
    esModule: false,
    interop: false,
    sourcemap: true,
    preferConst: true,
    exports: 'named',
  },
  external: [...builtinModules, ...Object.keys(dependencies)]
};