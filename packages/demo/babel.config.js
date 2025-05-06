const path = require('path');
const packCore = require('../core/package.json');
const packTripAnalysis = require('../trip-analysis/package.json');


module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
          [packCore.name]: path.join(__dirname, '../core', packCore.source),
          [packTripAnalysis.name]: path.join(__dirname, '../trip-analysis', packTripAnalysis.source),
        },
      },
    ],
  ],
};
