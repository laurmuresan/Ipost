import path from 'path';
import config from './index';
import uglify from './uglify';
import webpack from 'webpack';
import loadDependencies from '../utils/load-dependencies';
import getBuildVersion from '../utils/get-build-version';

const {
  env,
  includeNotListed,
  excludeFromListed,
  sourceAssets,
  publicAssets
} = config;

const ALL_DEPENDENCIES = loadDependencies();

export default function generateWebpackConfig() {
  const src = path.resolve(`${sourceAssets}/js/`);
  const dest = `${publicAssets}/js/`;
  const publicPath = '/js/';
  const version = getBuildVersion();

  const webpackConfig = {
    cache: true,
    context: src,
    noParse: ALL_DEPENDENCIES,
    plugins: [],
    resolve: {
      extensions: ['', '.js', '.jsx', '.json']
    },

    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules|vendor/,
          query: { cacheDirectory: true }
        },
        {
          include: /\.json$/,
          loaders: ["json-loader"]
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline',
          exclude: /node_modules|vendor/
        },
        {
          test: /\.html$/,
          loader: 'html',
          exclude: /node_modules|vendor/
        }
      ]
    }
  };

  if (!env.test) {
    webpackConfig.entry = {
      application: ['./index.js'],
      vendor: loadDependencies(excludeFromListed, includeNotListed)
    };

    webpackConfig.output = {
      path: dest,
      filename: env.production ? '[name].min.js' : '[name].js',
      publicPath: publicPath,
      jsonpFunction: 'appLoader'
    };

    webpackConfig.plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: env.production ? '[name].min.js' : '[name].js'
      }),

      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(
            env.production ? 'production' : 'development'
          ),
          'VERSION': JSON.stringify(version)
        }
      })
    );
  }

  if (env.development) {
    webpackConfig.devtool = 'source-map';
    webpack.debug = true;
  }

  if (env.production) {
    webpackConfig.plugins.push(
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(uglify),
      new webpack.NoErrorsPlugin()
    );
  }

  // TODO: remove mock-data.js asap
  webpackConfig.entry.application.push('./mock-data.js');

  return webpackConfig;
}
