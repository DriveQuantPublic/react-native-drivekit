const path = require('path');
const packCore = require('../core/package.json');
const packDriverData = require('../driver-data/package.json')


module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
          [packCore.name]: path.join(__dirname, '../core', packCore.source),
          [packDriverData.name]: path.join(__dirname, '../driver-data', packDriverData.source),
        },
      },
    ],
  ],
};
