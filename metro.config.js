const { getDefaultConfig } = require('expo/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.unstable_conditionNames = ['browser']
config.resolver.unstable_enablePackageExports = false;

module.exports = wrapWithReanimatedMetroConfig(config);