import config from './index';

const { sourceAssets, publicAssets } = config;

export default {
  src: `${sourceAssets}/js/vendor/ckfinder/**/*`,
  dest: `${publicAssets}/js/ckfinder`,
  base: `${sourceAssets}/js/vendor/ckfinder/`
}
