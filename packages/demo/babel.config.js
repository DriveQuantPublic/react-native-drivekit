const path = require('path');
const pakCore = require('../core/package.json');
const pakTripAnalysis = require('../trip-analysis/package.json');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
          [pakCore.name]: path.join(__dirname, '../core', pakCore.source),
          [pakTripAnalysis.name]: path.join(
            __dirname,
            '../trip-analysis',
            pakTripAnalysis.source,
          ),
        },
      },
    ],
  ],
};
