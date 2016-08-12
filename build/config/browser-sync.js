import config from './index';
import serverConfig from './server';

const { port, hostname, proxyPort } = serverConfig;

export default {
  port,
  host: hostname,
  proxy: `${hostname}:${proxyPort}`,

  open: 'external',
  ghostMode: false,

  browser: config.browser,

  snippetOptions: {
    rule: {
      match: /<\/body>/i,
      fn(snippet, match) {
        return `${snippet}\n${match}`;
      }
    }
  }
}
