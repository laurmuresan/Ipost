import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import express from 'express';
import proxyRequest from './proxy-requests';
import serverConfig from '../build/config/server';

const { staticDirectories, logLevel } = serverConfig;

export default function startServer() {
  const app = express();

  app.use(morgan(logLevel));

  staticDirectories.forEach((path) => {
    app.use('/static', express.static(path));
  });

  app.engine('html', (filename, options, callback) => {
    fs.readFile(filename, 'utf8', (err, str) => {
      if (err) {
        return callback(err);
      }

      callback(null, str);
    });
  });

  app.set('views', './static');
  app.set('view engine', 'html');

  // API requests
  app.all('/api/*', proxyRequest);

  // Status check
  app.all('/status', proxyRequest);

  // Serve index.html for all routes
  app.all('/*', (req, res) => res.render('index'));

  return app;
}
