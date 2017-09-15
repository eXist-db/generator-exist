var gulp = require('gulp');
var prettyData = require('../');

gulp.task('minify', function(){
  gulp.src('./src/*.{json,xml}')
  .pipe(prettyData({
  	type: 'minify',
  	preserveComments: true
  }))
  .pipe(gulp.dest('./build'));
});

gulp.task('pretty', function(){
  gulp.src('./src/*.{json,xml}')
  .pipe(prettyData({
  	type: 'prettify'
  }))
  .pipe(gulp.dest('./build'));
});

gulp.task('xliff', function(){
  console.log(process.argv);
  gulp.src('./src/*.xlf')
  .pipe(prettyData({
    extensions: {'xlf': 'xml'},
    type: 'prettify'
  }))
  .pipe(gulp.dest('./build'));
});
