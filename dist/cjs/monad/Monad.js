"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.trampoline = exports.getMonadUnWrapper = exports.flatMap = exports.ap = exports.fmap = exports.join = exports.valueOf = exports.isMonad = void 0;

var _fjl = require("fjl");

var _Applicative2 = _interopRequireDefault(require("../functor/Applicative"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _isMonad = function isMonad(value) {
  return value instanceof Monad;
},
    valueOf = function valueOf(x) {
  return x.valueOf();
},
    join = function join(x) {
  return x.join();
},
    fmap = (0, _fjl.curry)(function (fn, x) {
  return x.map(fn);
}),
    ap = (0, _fjl.curry)(function (applicative, functor) {
  return applicative.ap(functor);
}),
    flatMap = (0, _fjl.curry)(function (fn, monad) {
  return monad.flatMap(fn);
}),
    getMonadUnWrapper = function getMonadUnWrapper(Type) {
  var isTypeToUnWrap = (0, _fjl.instanceOf)(Type);
  return function unWrapMonadByType(monad) {
    return isTypeToUnWrap(monad) ? function trampolineCall() {
      return unWrapMonadByType(monad.valueOf());
    } : monad;
  };
},
    trampoline = function trampoline(fn) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var result = (0, _fjl.apply)(fn, args);

    while ((0, _fjl.isset)(result) && result.name === 'trampolineCall' && (0, _fjl.isFunction)(result)) {
      result = result();
    }

    return result;
  };
};

exports.trampoline = trampoline;
exports.getMonadUnWrapper = getMonadUnWrapper;
exports.flatMap = flatMap;
exports.ap = ap;
exports.fmap = fmap;
exports.join = join;
exports.valueOf = valueOf;
exports.isMonad = _isMonad;

var Monad =
/*#__PURE__*/
function (_Applicative) {
  _inherits(Monad, _Applicative);

  function Monad() {
    _classCallCheck(this, Monad);

    return _possibleConstructorReturn(this, _getPrototypeOf(Monad).apply(this, arguments));
  }

  _createClass(Monad, [{
    key: "join",
    value: function join() {
      return Monad.unWrapMonadByType(this.constructor, this);
    }
  }, {
    key: "flatMap",
    value: function flatMap(fn) {
      var out = Monad.unWrapMonadByType(this.constructor, fn(this.join()));
      return this.constructor.of(out);
    }
  }, {
    key: "chain",
    value: function chain(fn) {
      return this.flatMap(fn);
    }
  }], [{
    key: "unWrapMonadByType",
    value: function unWrapMonadByType(Type, monad) {
      if (!(0, _fjl.isset)(monad)) {
        return monad;
      }

      var unwrap = trampoline(getMonadUnWrapper(Type));
      return unwrap(monad);
    }
  }, {
    key: "of",
    value: function of(x) {
      return new Monad(x);
    }
  }, {
    key: "isMonad",
    value: function isMonad(x) {
      return _isMonad(x);
    }
  }]);

  return Monad;
}(_Applicative2.default);

exports.default = Monad;