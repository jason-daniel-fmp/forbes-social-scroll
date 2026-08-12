const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Always bundle workspace packages from source so UI/theme edits show up immediately.
config.resolver.extraNodeModules = {
  '@forbes/auth': path.resolve(workspaceRoot, 'packages/auth/src'),
  '@forbes/config': path.resolve(workspaceRoot, 'packages/config/src'),
  '@forbes/graphql': path.resolve(workspaceRoot, 'packages/graphql/src'),
  '@forbes/logger': path.resolve(workspaceRoot, 'packages/logger/src'),
  '@forbes/theme': path.resolve(workspaceRoot, 'packages/theme/src'),
  '@forbes/types': path.resolve(workspaceRoot, 'packages/types/src'),
  '@forbes/ui': path.resolve(workspaceRoot, 'packages/ui/src'),
};

module.exports = config;
