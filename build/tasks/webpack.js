import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import config from '../config/index';
import logger from '../utils/logger';
import browserSync from 'browser-sync';
import generateWebpackConfig from '../config/webpack';

const webpackConfig = generateWebpackConfig();
const compiler = webpack(webpackConfig);

gulp.task('webpack', (callback) => {
  compiler.run((err, stats) => {
    logger(err, stats);

    if (config.env.development) {
      browserSync.reload();
    }

    callback();
  });
});
