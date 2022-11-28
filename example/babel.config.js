const path = require('path');
const packCore = require('../packages/core/package.json');
const packTripAnalysis = require('../packages/trip-analysis/package.json');
const packDriverData = require('../packages/driver-data/package.json');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
          [packCore.name]: path.join(__dirname, '../packages/core', packCore.source),
          [packTripAnalysis.name]: path.join(
            __dirname,
            '../packages/trip-analysis',
            packTripAnalysis.source,
          ),
          [packDriverData.name]: path.join(
            __dirname,
            '../packages/driver-data',
            packDriverData.source,
          ),
        },
      },
    ],
  ],
};
