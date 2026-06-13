module.exports = {
  lintOnSave: false,
  // Vue CLI 3.x: baseUrl is the legacy name for relative asset paths in built output.
  baseUrl: './',
  // Use Dart Sass (npm `sass`) instead of deprecated `node-sass` (no native compile).
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
      },
    },
  },
};
