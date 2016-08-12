import { Promise } from 'es6-promise';
import { default as request, Request } from 'superagent';
import SuperagentPromiseError from './promise-error';

request.SuperagentPromiseError = SuperagentPromiseError;

Request.prototype.promise = function () {
  const req = this;
  let error;

  return new Promise((resolve, reject) => {
    req.end((err, res) => {
      if (typeof res !== 'undefined' && res.status >= 400) {
        let msg = `cannot ${req.method} ${req.url} (${res.status})`;

        error = new SuperagentPromiseError(msg);
        error.status = res.status;
        error.body = res.body;
        error.res = res;

        reject(error);

      } else if (err) {
        reject(new SuperagentPromiseError(err));
      } else {
        resolve(res);
      }
    });
  });
};


Request.prototype.then = function () {
  const promise = this.promise();
  return promise.then.apply(promise, arguments);
};

export default request;
