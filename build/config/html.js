import config from './index';

const { sourceDirectory, staticFolder } = config;

export default {
  src: `${sourceDirectory}/html/**/*.html`,
  dest: staticFolder
}
