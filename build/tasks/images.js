import gulp, { task } from 'gulp';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import { src, dest } from '../config/images';
import browserSync from 'browser-sync';

task('images', () => {
  return gulp.src(src)
    .pipe(changed(dest))
    .pipe(imagemin())
    .pipe(gulp.dest(dest))
    .pipe(browserSync.reload({ stream: true }));
});
