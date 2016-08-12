import { sourceAssets, publicAssets } from './index';

export default {
  src: `${sourceAssets}/svg/**/*.svg`,
  dest: `${publicAssets}/svg`,
  svgoPlugins: [{ removeViewBox: false }]
}
