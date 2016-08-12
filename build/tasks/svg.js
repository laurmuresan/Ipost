import gulp, { task } from 'gulp';
import gulpif from 'gulp-if';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import { src, dest, svgoPlugins } from '../config/svg';
import browserSync from 'browser-sync';

task('svg', () => {
  return gulp.src(src)
    .pipe(changed(dest))
    .pipe(imagemin({ svgoPlugins }))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.reload({ stream: true }));
});
