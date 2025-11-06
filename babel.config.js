// babel.config.js
/** @type {import("@babel/core").ConfigFunction} */
module.exports = (api) => {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // make sure this is last in the array:
      'react-native-reanimated/plugin'
    ]
  };
};