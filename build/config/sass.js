import { sourceAssets, publicAssets } from './index';

export default {
  entries: `${sourceAssets}/sass/application.{sass,scss}`,
  src: `${sourceAssets}/sass/**/*.{sass,scss,css}`,
  dest: `${publicAssets}/css`,

  sassOptions: {
    indentedSyntax: false,
    errLogToConsole: true,
    outputStyle: 'expanded',
    includePaths: [
      './node_modules',
      './node_modules/bootstrap-sass/assets/stylesheets',
      './src/sass/**/*'
    ]
  },

  minifyCSS: {
    keepBreaks: false,
    keepSpecialComments: false
  }
}
