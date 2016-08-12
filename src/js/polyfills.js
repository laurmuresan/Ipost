import 'babel-core/external-helpers';
import 'babel/polyfill';
import { polyfill as promisesPolyfill } from 'es6-promise';
import { default as intl } from 'intl';

// Enable promises for older browsers
promisesPolyfill();

// this needs to be loaded for Safari
// it's ugly and painful, sorry...
// TODO: maybe we can refactor this to be loade with `require.ensure`
if (window && !window.Intl) {
  window.Intl = intl;
}
