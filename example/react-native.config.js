const path = require('path');

module.exports = {
  dependencies: {
    '@react-native-drivekit/core': {
      root: path.join(__dirname, '../packages/core'),
    },
    '@react-native-drivekit/trip-analysis': {
      root: path.join(__dirname, '../packages/trip-analysis'),
    },
    '@react-native-drivekit/driver-data': {
      root: path.join(__dirname, '../packages/driver-data'),
    },
  },
};
