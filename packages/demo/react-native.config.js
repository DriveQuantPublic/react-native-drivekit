const path = require('path');

module.exports = {
  dependencies: {
    '@react-native-drivekit/core': {
      root: path.join(__dirname, '../core'),
    },
    'react-native-permissions': {
      root: path.join(__dirname, '../../node_modules/react-native-permissions'),
    },
  },
};
