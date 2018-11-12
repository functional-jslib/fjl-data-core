define(["exports", "./functor/Functor", "./functor/Apply", "./functor/Applicative", "./functor/Bifunctor", "./monad/Monad", "./io/IO", "./maybe/Maybe", "./either/Either", "./utils"], function (_exports, _Functor, _Apply, _Applicative, _Bifunctor, _Monad, _IO, _Maybe, _Either, _utils) {
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
    trampoline: true,
    IO: true
  };
  Object.defineProperty(_exports, "Functor", {
    enumerable: true,
    get: function get() {
      return _Functor.default;
    }
  });
  Object.defineProperty(_exports, "Apply", {
    enumerable: true,
    get: function get() {
      return _Apply.default;
    }
  });
  Object.defineProperty(_exports, "Applicative", {
    enumerable: true,
    get: function get() {
      return _Applicative.default;
    }
  });
  Object.defineProperty(_exports, "Bifunctor", {
    enumerable: true,
    get: function get() {
      return _Bifunctor.default;
    }
  });
  Object.defineProperty(_exports, "Monad", {
    enumerable: true,
    get: function get() {
      return _Monad.default;
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
  Object.defineProperty(_exports, "trampoline", {
    enumerable: true,
    get: function get() {
      return _Monad.trampoline;
    }
  });
  Object.defineProperty(_exports, "IO", {
    enumerable: true,
    get: function get() {
      return _IO.default;
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
  Object.keys(_utils).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _utils[key];
      }
    });
  });

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
});