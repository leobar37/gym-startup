const BABEL_ENV = process.env.BABEL_ENV;
const cjs = BABEL_ENV !== undefined && BABEL_ENV === 'cjs';

module.exports = {
  plugins: [
    'babel-plugin-transform-typescript-metadata',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    "@babel/plugin-proposal-class-properties"
  ],
  presets: [
    '@babel/preset-typescript',

  ],
};
