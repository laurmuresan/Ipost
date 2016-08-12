import gulp from 'gulp';
import config from '../config/index';
import htmlConfig from '../config/html';
import sassConfig from '../config/sass';

const jsSrc = config.javascripts.src;

gulp.task('watch', ['server', 'browser-sync'], () => {
  gulp.watch(sassConfig.src, ['sass']);
  gulp.watch(htmlConfig.src, ['html']);
  gulp.watch(jsSrc, ['webpack']);
});
