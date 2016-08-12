import prettify from './time-prettifier';
import errorHandler from './error-handler';
import { PluginError, log, colors } from 'gulp-util';

export default function logger(err, stats) {
  if (err) {
    throw new PluginError('Webpack compile error: ', err);
  }

  const { errors, warnings } = stats.compilation;
  let statColor = (warnings.length < 1) ? 'green' : 'yellow';

  if (errors.length > 0) {
    errors.forEach((error) => {
      errorHandler.call(this, error);
      statColor = 'red';
    });
  } else {
    let compileTime = prettify(stats.endTime - stats.startTime);

    log(colors[statColor](stats.toString({
      colors: true,         // add console colors
      hash: true,           // add the hash of the compilation
      version: false,       // add webpack version information
      timings: true,        // add timing information
      assets: false,        // add assets information
      chunks: true,         // add chunk information
      chunkModules: false,  // add built modules information to chunk information
      modules: false,       // add built modules information
      cached: true,         // add also information about cached (not built) modules
      reasons: true,        // add information about the reasons why modules are included
      source: false,        // add the source code of modules
      errorDetails: false,  // add details to errors (like resolving log)
      chunkOrigins: false,  // add the origins of chunks and chunk merging info
      modulesSort: false,   // (string) sort the modules by that field
      chunksSort: false,    // (string) sort the chunks by that field
      assetsSort: false,    // (string) sort the assets by that field
    })));

    log('Compiled with', colors.cyan('webpack'), 'in', colors.magenta(compileTime));
  }
}
