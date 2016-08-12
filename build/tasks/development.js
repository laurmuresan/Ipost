import gulp from 'gulp';
import sequence from 'gulp-sequence';

gulp.task('development', (callback) => {
  sequence(
    'clean',
    ['fonts', 'images', 'svg', 'html', 'ckeditor', 'ckfinder'],
    'sass', 'webpack', 'lint-watch',
    callback
  );
});
