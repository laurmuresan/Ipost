import gulp from 'gulp';
import ckEditorConfig from '../config/ckeditor';
import browserSync from 'browser-sync';

gulp.task('ckeditor', () => {
  const { src, base, dest } = ckEditorConfig;

  return (
    gulp
      .src(src, { base })
      .pipe(gulp.dest(dest))
      .pipe(browserSync.reload({ stream: true }))
  );
});
