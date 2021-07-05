import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-cpy';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es'
  },
  plugins: [
    typescript(),
    copy({
      files: 'src/peregrine/*.wasm*',
      dest: 'dist',
      options: {
        verbose: true
      }
    })
  ]
};
