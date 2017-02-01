var Promise = require('promise-polyfill');

if (!window.Promise) {
  window.Promise = Promise;
}

var fetch = require('whatwg-fetch');

if (!window.fetch) {
  window.fetch = fetch;
}

window.h = require('cakejs2').h;

import './app/index.js';
import './app/index.html';

