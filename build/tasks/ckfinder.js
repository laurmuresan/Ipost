import gulp from 'gulp';
import ckFinderConfig from '../config/ckfinder';
import browserSync from 'browser-sync';

gulp.task('ckfinder', () => {
  const { src, base, dest } = ckFinderConfig;

  return (
    gulp
      .src(src, { base })
      .pipe(gulp.dest(dest))
      .pipe(browserSync.reload({ stream: true }))
  );
});
