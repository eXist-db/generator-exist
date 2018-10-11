var gulp       = require('gulp');
var prettyData = require('gulp-pretty-data');

// dummy gulpfile to test the abandoned pretty data plugin

gulp.task('minify', function (done) {
  gulp.src('./src/**.{xml,xconf}')
    .pipe(prettyData({
      type: 'minify',
      preserveComments: true,
      extensions: {
        'xconf': 'xml'
      }
    }))
    .pipe(gulp.dest('./dist'))
    done()
})

gulp.task('prettify', function (done) {
  gulp.src('./src/**.{xml,xconf}')
    .pipe(prettyData({
      type: 'prettify',
      extensions: {
        'xconf': 'xml'
      }
    }))
    .pipe(gulp.dest('./dist'))
    done()
})
