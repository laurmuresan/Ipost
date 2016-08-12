import gulp from 'gulp';
import gutil from 'gulp-util';
import through from 'through2';
import config from '../config/index';
import browserSync from 'browser-sync';
import htmlConfig from '../config/html';
import errorHandler from '../utils/error-handler';
import getVersion from '../utils/get-build-version';

const { env } = config;
const { src, dest } = htmlConfig;

gulp.task('html', function () {
  return (
    gulp
      .src(src)
      .pipe(renderer())
      .on('error', errorHandler.bind(this))
      .pipe(gulp.dest(dest))
      .pipe(browserSync.reload({ stream: true }))
  );
});


function renderer(options, settings) {
  const pattern = /<%= min %>/gi;
  const versionPattern = /<%= version %>/gi;
  const replacement = env.production ? '.min' : '';
  const versionReplacement = getVersion();

  let contents = '';

  return through.obj(function (file, enc, callback) {
    if (file.isNull()) {
      this.push(file);
      return callback();
    }

    if (file.isStream()) {
      this.emit(
        'error',
        new gutil.PluginError('Gulp html task', 'Streaming not supported')
      );
    }

    try {
      contents = file.contents.toString();
      contents = contents.replace(pattern, replacement)
        .replace(versionPattern, versionReplacement);

      file.contents = new Buffer(contents);
    } catch (err) {
      this.emit(
        'error',
        new gutil.PluginError('Gulp html task', err.toString())
      );
    }

    this.push(file);
    callback();
  });
};
