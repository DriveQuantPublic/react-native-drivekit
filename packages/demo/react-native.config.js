const path = require('path');

module.exports = {
  dependencies: {
    '@react-native-drivekit/core': {
      root: path.join(__dirname, '../core'),
    },
    '@react-native-drivekit/trip-analysis': {
      root: path.join(__dirname, '../trip-analysis'),
    },
    'react-native-permissions': {
      root: path.join(__dirname, '../../node_modules/react-native-permissions'),
    },
  },
};
