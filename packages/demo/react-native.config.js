const path = require('path');

module.exports = {
  dependencies: {
    '@react-native-drivekit/core': {
      root: path.join(__dirname, '../core'),
    },
    '@react-native-drivekit/driver-data': {
      root: path.join(__dirname, '../driver-data'),
    },
  },
}
