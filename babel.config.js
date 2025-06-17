module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    // plugins: [["inline-import", { "extensions": [".sql"] }]]
    plugins: [
      // make sure this is last in the array:
      'react-native-reanimated/plugin'
    ]

  }
}
