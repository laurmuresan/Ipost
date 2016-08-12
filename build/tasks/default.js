import { task } from 'gulp';
import { env } from '../config/index';
import { default as sequence } from 'gulp-sequence';

task('default', (callback) => {
  if (env.production)  {
    sequence('production', callback);
  } else {
    sequence('development', ['watch'], callback);
  }
});
