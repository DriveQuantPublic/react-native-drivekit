const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(__dirname, '../..');

const config = {
  projectRoot,
  watchFolders: [workspaceRoot],
  resolver: {
    nodeModulesPaths: [path.resolve(workspaceRoot, 'node_modules')],
  },
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
