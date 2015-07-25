module.exports = function () {

  var projectRoot = process.env.PWD = process.cwd(),
    bowerDir = 'bower_components/',
    srcDir = 'src/',
    libDir = 'lib/',
    exampleDir = 'example/',
    distDir = 'dist/',
    appSourceFiles = [
      srcDir.concat('**/*.js'),
      srcDir.concat('*.js'),
    ];

  var config = {
    packageJson: ['./package.json', './bower.json'],
    projectRoot: projectRoot,
    filesets: {
      appSourceFiles: appSourceFiles,
    },
    paths: {
      srcDir: srcDir,
      distDir: distDir,
      exampleDir: exampleDir
    },
    bower: {
      json: require('../bower.json'),
      directory: 'bower_components/',
      ignorePath: '../bower_components',
      exclude: []
    }
  };

  return config;

};
