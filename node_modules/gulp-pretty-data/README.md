# gulp-pretty-data

> Minify or prettify xml, json, css, sql.

## Getting Started
Install the module with: `npm install gulp-pretty-data --save-dev`

## Usage

```js
var gulp       = require('gulp');
var prettyData = require('gulp-pretty-data');

gulp.task('minify', function() {
  gulp.src('src/**.{xml,json,xlf,svg}')
    .pipe(prettyData({
      type: 'minify',
      preserveComments: true,
      extensions: {
        'xlf': 'xml',
        'svg': 'xml'
      }
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('prettify', function() {
  gulp.src('src/**.{xml,json}')
    .pipe(prettyData({type: 'prettify'}))
    .pipe(gulp.dest('dist'))
});
```

See the [pretty data node plugin](https://github.com/vkiryukhin/pretty-data) for more info.

## Author
+ [github/neilcarpenter](https://github.com/neilcarpenter)

## License
Copyright (c) 2014 Neil Carpenter
Licensed under the MIT license.

## To do
> Add tests
