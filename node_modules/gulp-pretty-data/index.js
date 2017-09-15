'use strict';

var pd      = require('pretty-data').pd;
var gutil   = require('gulp-util');
var path    = require('path');
var through = require('through2');

module.exports = function (opts) {

  if (!opts || !opts.type || (opts.type !== 'minify' && opts.type !== 'prettify')) {
    throw new gutil.PluginError('gulp-pretty-data', 'Please specify a "type" of "minify" or "prettify"');
  }

  opts.preserveComments = opts.hasOwnProperty('preserveComments') ? opts.preserveComments : false;
  opts.extensions = opts.hasOwnProperty('extensions') ? opts.extensions : {};
  opts.verbose = process.argv.indexOf('--verbose') !== -1;

  var validExts    = ['xml', 'json', 'css', 'sql'];
  var methodSuffix = opts.type === 'minify' ? 'min' : '';

  return through.obj(function (file, enc, cb) {

    var fileExt = path.extname(file.path).toLowerCase().substr(1);
    fileExt = fileExt in opts.extensions ? opts.extensions[fileExt] : fileExt;

    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-pretty-data', 'Streaming not supported'));
      return;
    }

    if (validExts.indexOf(fileExt) === -1) {
      if (opts.verbose) {
        gutil.log('gulp-pretty-data: Skipping unsupported file ' + chalk.blue(file.relative));
      }

      cb(null, file);
      return;
    }

    try {
      file.contents = new Buffer(pd[fileExt+methodSuffix](String(file.contents), opts.preserveComments));
    } catch (err) {
      return cb(new gutil.PluginError('gulp-pretty-data', err, opts));
    }
    cb(null, file);

  });

};
