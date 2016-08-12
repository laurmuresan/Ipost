import config from './index';

const { sourceAssets, publicAssets } = config;

export default {
  src: `${sourceAssets}/js/vendor/ckeditor/**/*`,
  dest: `${publicAssets}/js/ckeditor`,
  base: `${sourceAssets}/js/vendor/ckeditor/`
}
