import gulp, { task } from 'gulp';
import changed from 'gulp-changed';
import browserSync from 'browser-sync';
import { src, dest } from '../config/fonts';

task('fonts', () => {
  return gulp.src(src)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.reload({ stream: true }));
});
