const typescript = require('rollup-plugin-typescript2')
const dts = require('rollup-plugin-dts').default
const del = require('rollup-plugin-delete')

module.exports = [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    external: ['react'],
    plugins: [
      del({ targets: './dist' }),
      typescript({
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          include: ['./src'],
          exclude: ['./src/**/*.test.ts'],
          compilerOptions: {
            module: 'esnext',
          },
        },
      }),
    ],
  },
  {
    input: 'dist/@types/index.d.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [dts(), del({ targets: './dist/@types', hook: 'buildEnd' })],
  },
]
