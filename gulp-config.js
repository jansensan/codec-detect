module.exports = function () {

  var srcDir = 'src/',
    exampleDir = 'example/',
    distDir = './',
    sourceFiles = [
      srcDir.concat('**/*.js'),
      srcDir.concat('*.js'),
    ];

  var pipelines = {
    package: {
      src: sourceFiles,
      dest: distDir
    },
    validate: {
      src: sourceFiles
    }
  };
  return pipelines;

};
