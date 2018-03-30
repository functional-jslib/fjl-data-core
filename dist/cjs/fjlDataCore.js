'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Monad = require('./monad/Monad');

Object.keys(_Monad).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Monad[key];
    }
  });
});

var _Maybe = require('./maybe/Maybe');

Object.keys(_Maybe).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Maybe[key];
    }
  });
});

var _Either = require('./either/Either');

Object.keys(_Either).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Either[key];
    }
  });
});

var _IO = require('./io/IO');

Object.keys(_IO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _IO[key];
    }
  });
});