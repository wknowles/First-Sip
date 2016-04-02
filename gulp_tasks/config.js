module.exports = {
  paths: {
    project: './',
    css: {
      entry: './app/scss/style.scss',
      all: './app/scss/**/*.scss',
      dest: './app/css'
    },
    // js: {
    //   entry: './assets/js/local/app.js',
    //   vendor: './assets/js/vendor/*.js',
    //   dest: './assets/js',
    //   all: './assets/js/**/*.js'
    // }
  },
  names: {
    css: 'app.min.css',
    js: {
      app: 'app.min.js',
      vendor: 'vendor.min.js'
    }
  }
};