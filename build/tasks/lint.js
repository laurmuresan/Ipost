import path from 'path';
import gulp from 'gulp';
import cache from 'gulp-cached';
import gulpif from 'gulp-if';
import eslint from 'gulp-eslint';
import config from '../config/index';
import formatter from 'eslint-friendly-formatter';

const { env, javascripts } = config;

gulp.task('lint', () => {
  return (
    gulp
      .src(javascripts.src)
      .pipe(cache('lint', { optimizeMemory: true }))
      .pipe(eslint())
      .pipe(eslint.format(formatter))
      .pipe(gulpif(env.development, eslint.result((result) => {
        if (result.warningCount > 0 || result.errorCount > 0) {
          delete cache.caches.lint[path.resolve(result.filePath)];
        }
      })))
      .pipe(gulpif(env.production, eslint.failOnError()))
  );
});

gulp.task('lint-watch', () => {
  gulp.watch(javascripts.src, ['lint'], (event) => {
    if (event.type === 'deleted' && cache.caches.eslint) {
      delete cache.caches.lint[event.path];
    }
  });
})
