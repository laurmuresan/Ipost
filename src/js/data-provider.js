import url from 'url';
import forEach from 'lodash/forEach';
import routeMatcher from './route-matcher';
import { camelizeKeys, decamelizeKeys } from './utils/string';
import { Promise } from 'es6-promise';
import { default as request } from './request';
import { default as config } from './resources/config';
import ErrorHandler from './error-handler';

const translateVerbsToMethods = {
  'HEAD': 'head',
  'GET': 'get',
  'POST': 'post',
  'PUT': 'put',
  'PATCH': 'patch',
  'DELETE': 'del'
};

class DataProvider {
  constructor(endpoints = config.API_ENDPOINTS) {
    const { baseUrl, ...rest } = endpoints;
    this.reloadDone = true;
    this.baseUrl = baseUrl;
    this.endpoints = rest;
    this.request = request;
  }

  getURL(path, params) {
    params = decamelizeKeys(params);

    const route = routeMatcher(url.resolve(this.baseUrl, path), params);
    const [ endpoint, queryObject ] = route.build();
    let queryParams = [];

    forEach(queryObject, (value, key) => {
      queryParams.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
    });

    return endpoint + (queryParams.length ? '?' + queryParams.join('&') : '');
  }

  head(path, params) {
    return this.callApi({
      path,
      params,
      method: 'HEAD'
    });
  }

  get(path, params) {
    return this.callApi({
      path,
      params,
      method: 'GET'
    });
  }

  post(path, params) {
    return this.callApi({
      path,
      params,
      method: 'POST'
    });
  }

  put(path, params) {
    return this.callApi({
      path,
      params,
      method: 'PUT'
    });
  }

  patch(path, params) {
    return this.callApi({
      path,
      params,
      method: 'PATCH'
    });
  }

  del(path, params) {
    return this.callApi({
      path,
      params,
      method: 'DELETE'
    });
  }

  status() {
    return this.get(this.endpoints.status);
  }

  validateSession() {
    return this.get(this.endpoints.sessionCheck);
  }

  authenticate(params) {
    return this.post(this.endpoints.login, params);
  }

  deauthenticate(params) {
    return this.get(this.endpoints.logout, params);
  }

  upload(path, params) {
    const { files, name, ...rest } = params;
    const route = routeMatcher(url.resolve(this.baseUrl, path), rest);
    const [ endpoint, queryObject ] = route.build();

    let req = this.request.post(endpoint);

    return new Promise((resolve, reject) => {
      req = DataProvider.setFields(req, queryObject);

      if (files && files.length) {
        req = DataProvider.attachFiles(req, name, files);
      }

      this.endRequest({ req, resolve, reject });
    });
  }

  formatURL(format) {
    ErrorHandler.warn(
      'deprecated',
      '`DataProvider#formatURL` is deprecated, use any ' +
      '`DataProvider` method with an endpoint and a set of params. Ex: \n' +
      'DataProvider.get(\'folders/:id/move\', { folderId: 1 })'
    );

    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] !== 'undefined' ? args[number] : match;
    });
  }

  endRequest({ req, resolve, reject }) {
    req.then((response) => {
      response.body = camelizeKeys(response.body);
      resolve(response);
    }).catch((err) => reject(err));
  }

  /**
   * Calls backend API by making a `XMLHttpRequest`
   * @param method {string} - HTTP verb (HEAD, GET, POST, PUT, PATCH, DELETE)
   * @param path {String} - API path or URL
   * @param params {Object} - search parameters
   * @param contentType {String} - request Content-Type, default is 'application/json'
   * @returns {Promise}
   */
  callApi({ method, path, params, contentType = 'application/json' }) {
    const route = routeMatcher(url.resolve(this.baseUrl, path), params);
    const [ endpoint, queryObject ] = route.build();

    let req = this.request[translateVerbsToMethods[method]](endpoint);

    return new Promise((resolve, reject) => {
      req.set('Content-Type', contentType);
      req = DataProvider.prepareData(req, queryObject, method);
      this.endRequest({req, resolve, reject});
    }).then((res) => {
      //check
      const {errors} = res.body;
      if (errors) {
        for (let i = 0; i < errors.length; i++) {
          if (errors[i].status === 'EAUTH' && this.reloadDone === false) {
            window.location.reload();
            break;
          }
        }
      }
      this.reloadDone = false;
      return res;
    });
  }

  static prepareData(req, params, method) {
    params = decamelizeKeys(params);

    if (method === 'GET') {
      return req.query(params);
    }

    return req.send(params);
  }

  static setFields(req, params) {
    params = decamelizeKeys(params);

    forEach(params, (value, key) => {
      if (key !== 'name') {
        req.field(key, value);
      }
    });

    return req;
  }

  static attachFiles(req, name, files) {
    forEach(files, (file) => {
      req.attach(name, file, file.name);
    });

    return req;
  }
}

export default DataProvider;
