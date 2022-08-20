const BABEL_ENV = process.env.BABEL_ENV;
const cjs = BABEL_ENV !== undefined && BABEL_ENV === 'cjs';

/**
 * @type { import("@babel/core").ConfigAPI}
 */
module.exports = {
  extends : "../../babel.config.js",
  plugins: [
    '@chakra-ui/babel-plugin',
  ],
  presets: [
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        loose: true,
        modules: cjs ? 'commonjs' : false,
      },
    ],
  ],
};
