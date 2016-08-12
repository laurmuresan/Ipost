import gulp from 'gulp';
import http from 'http';
import logger from 'morgan';
import gutil from 'gulp-util';
import express from 'express';
import startServer from '../../server/index';
import serverConfig from '../config/server';

const { proxyPort, hostname } = serverConfig;

gulp.task('server', () => {
  const app = express();

  let server;

  app.use(startServer());

  server = http.createServer(app);

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      gutil.log(`Proxy server is already started at port: ${proxyPort}`);
    } else {
      throw err;
    }
  });

  server.listen(proxyPort);
});
