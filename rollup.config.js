import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-cpy';


const plugins = [
  typescript(),
  copy({
    files: 'src/peregrine/*',
    dest: 'dist/',
    options: {
      verbose: true
    }
  })
];

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/bundle-cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/bundle-es.js',
      format: 'es'
    }
  ],
  plugins: plugins
};