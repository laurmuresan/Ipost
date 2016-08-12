import httpProxy from 'http-proxy';
import serverConfig from '../build/config/server';

const proxy = httpProxy.createProxyServer();

export default (req, res, next) => {
  const { apiHostname, protocol, proxyConf } = serverConfig;

  let [ host, port ] = apiHostname.split(':');

  if (!port) {
    port = 80;
  }

  proxy.proxyRequest(req, res , {
    target: { host, port, protocol },
    secure: false,
    changeOrigin: true
  });

  proxy.on('error', (err) => {
    console.error(`Could not connect to '${apiHostname}' API server. Please try again...`);
    next();
  });
};
