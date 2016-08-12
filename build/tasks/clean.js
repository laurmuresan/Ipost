import del from 'del';
import { task } from 'gulp';
import { log } from 'gulp-util';
import config from '../config/index';

task('clean', (callback) => {
  del([config.staticFolder]).then(() => {
    log('Successfully cleaned static files...');
    callback();
  });
});
