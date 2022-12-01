const path = require('path');

module.exports = {
  dependencies: {
    '@react-native-drivekit/core': {
      root: path.join(__dirname, '../core'),
    },
    '@react-native-drivekit/trip-analysis': {
      root: path.join(__dirname, '../trip-analysis'),
    },
    '@react-native-drivekit/driver-data': {
      root: path.join(__dirname, '../driver-data'),
    },
    '@react-native-drivekit/trip-simulator': {
      root: path.join(__dirname, '../trip-simulator'),
    },
    'react-native-permissions': {
      root: path.join(__dirname, '../../node_modules/react-native-permissions'),
    },
  },
};
