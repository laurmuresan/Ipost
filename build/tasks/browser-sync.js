import { task } from 'gulp';
import browserSync from 'browser-sync';
import { default as config } from '../config/browser-sync';

task('browser-sync', () => browserSync.init(config));
