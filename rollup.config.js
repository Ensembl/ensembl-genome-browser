import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

export default [
  // CommonJS
  {
    input: 'src/index.ts',
    output: {
      dir: './dist/',
      entryFileNames: 'bundle-cjs.js',
      format: 'cjs'
    },
    plugins: [
      typescript({
        declaration: true,
        declarationDir: 'dist/',
        rootDir: 'src/'
      }),
      copy({
        targets: [
          { src: 'src/peregrine/*', dest: 'dist/' }
        ],
        verbose: true
      })
    ]
  },

  // ES
  {
    input: 'src/index.ts',
    output: { 
      dir: './dist',
      entryFileNames: 'bundle-es.js', 
      format: 'es'
    },
    plugins: [
      typescript()
    ]
  },
];