import gulp, { task } from 'gulp';
import sass from 'gulp-sass';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import minify from 'gulp-clean-css';
import compass from 'compass-importer';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import errorHandler from '../utils/error-handler';
import autoprefixer from 'gulp-autoprefixer';
import { env, production } from '../config/index';
import { entries, dest, minifyCSS, sassOptions } from '../config/sass';

task('sass', function () {
  if (env.development) {
    delete production.suffix;
  }

  return (
    gulp
      .src(entries)
      .pipe(gulpif(!env.production, sourcemaps.init()))
      .pipe(sass({ ...sassOptions, importer: compass }).on('error', sass.logError))
      .on('error', errorHandler.bind(this))
      .pipe(autoprefixer())
      .pipe(gulpif(!env.production, sourcemaps.write()))
      .pipe(gulpif(env.production, minify(minifyCSS)))
      .pipe(rename(production))
      .pipe(gulp.dest(dest))
      .pipe(browserSync.reload({ stream: true }))
  );
});
