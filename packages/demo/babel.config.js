const path = require('path');
const pakCore = require('../core/package.json');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
          [pakCore.name]: path.join(__dirname, '../core', pakCore.source),
        },
      },
    ],
  ],
};
