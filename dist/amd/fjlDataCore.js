function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

define(["exports", "./functor/Functor", "./functor/Apply", "./functor/Applicative", "./functor/Bifunctor", "./monad/Monad", "./io/IO", "./maybe/Maybe", "./either/Either"], function (_exports, _Functor, _Apply, _Applicative, _Bifunctor, _Monad, _IO, _Maybe, _Either) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  var _exportNames = {
    Functor: true,
    Apply: true,
    Applicative: true,
    Bifunctor: true,
    Monad: true,
    isMonad: true,
    valueOf: true,
    join: true,
    fmap: true,
    ap: true,
    flatMap: true,
    getMonadUnWrapper: true,
    IO: true
  };
  Object.defineProperty(_exports, "Functor", {
    enumerable: true,
    get: function get() {
      return _Functor["default"];
    }
  });
  Object.defineProperty(_exports, "Apply", {
    enumerable: true,
    get: function get() {
      return _Apply["default"];
    }
  });
  Object.defineProperty(_exports, "Applicative", {
    enumerable: true,
    get: function get() {
      return _Applicative["default"];
    }
  });
  Object.defineProperty(_exports, "Bifunctor", {
    enumerable: true,
    get: function get() {
      return _Bifunctor["default"];
    }
  });
  Object.defineProperty(_exports, "Monad", {
    enumerable: true,
    get: function get() {
      return _Monad["default"];
    }
  });
  Object.defineProperty(_exports, "isMonad", {
    enumerable: true,
    get: function get() {
      return _Monad.isMonad;
    }
  });
  Object.defineProperty(_exports, "valueOf", {
    enumerable: true,
    get: function get() {
      return _Monad.valueOf;
    }
  });
  Object.defineProperty(_exports, "join", {
    enumerable: true,
    get: function get() {
      return _Monad.join;
    }
  });
  Object.defineProperty(_exports, "fmap", {
    enumerable: true,
    get: function get() {
      return _Monad.fmap;
    }
  });
  Object.defineProperty(_exports, "ap", {
    enumerable: true,
    get: function get() {
      return _Monad.ap;
    }
  });
  Object.defineProperty(_exports, "flatMap", {
    enumerable: true,
    get: function get() {
      return _Monad.flatMap;
    }
  });
  Object.defineProperty(_exports, "getMonadUnWrapper", {
    enumerable: true,
    get: function get() {
      return _Monad.getMonadUnWrapper;
    }
  });
  Object.defineProperty(_exports, "IO", {
    enumerable: true,
    get: function get() {
      return _IO["default"];
    }
  });
  _Functor = _interopRequireDefault(_Functor);
  _Apply = _interopRequireDefault(_Apply);
  _Applicative = _interopRequireDefault(_Applicative);
  _Bifunctor = _interopRequireDefault(_Bifunctor);
  _Monad = _interopRequireWildcard(_Monad);
  _IO = _interopRequireDefault(_IO);
  Object.keys(_Maybe).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _Maybe[key];
      }
    });
  });
  Object.keys(_Either).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _Either[key];
      }
    });
  });

  function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
});