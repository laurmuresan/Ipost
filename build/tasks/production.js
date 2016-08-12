import gulp from 'gulp';
import sequence from 'gulp-sequence';

gulp.task('production', (callback) => {
  sequence(
    'clean', 'lint',
    ['fonts', 'images', 'svg', 'html', 'ckeditor', 'ckfinder'],
    'sass', 'webpack',
    callback
  );
});
