import { env, publicDirectory } from './index';

export default {
  root: publicDirectory,
  port: env.port || 5000,
  proxyPort: env.proxyPort || 7070,
  protocol: env.protocol || 'http',
  hostname: env.host || 'localhost',
  apiHostname: env.api || 'localhost',
  logLevel: env.production ? 'combined' : 'dev',
  staticDirectories: [ './static', '/browser-sync' ],

  proxyConf: {
    timeout: 10000
  }
}
