import { env } from 'gulp-util';
import getVersion from '../utils/get-build-version';

const CURRENT = './';
const STATIC = './static';
const SOURCES = './src';

const version = getVersion();

export default {
  env,
  staticFolder: STATIC,
  publicDirectory: `${STATIC}/${version}`,
  sourceDirectory: SOURCES,
  publicAssets: `${STATIC}/${version}`,
  sourceAssets: SOURCES,

  production: {
    basename: 'application',
    suffix: '.min',
    dirname: CURRENT
  },

  javascripts: {
    src: `${SOURCES}/js/**/*.{js,jsx}`
  },

  // List of modules to exclude or include in the vendor bundle
  includeNotListed: [],
  excludeFromListed: ['bootstrap-sass', 'ckeditor', 'ckfinder']
}
