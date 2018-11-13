(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "fjl", "../functor/Applicative", "../functor/Functor"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("fjl"), require("../functor/Applicative"), require("../functor/Functor"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.fjl, global.Applicative, global.Functor);
    global.Monad = mod.exports;
  }
})(this, function (_exports, _fjl, _Applicative2, _Functor) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.getMonadUnWrapper = _exports.flatMap = _exports.ap = _exports.fmap = _exports.join = _exports.valueOf = _exports.alwaysMonad = _exports.isMonad = void 0;
  _Applicative2 = _interopRequireDefault(_Applicative2);
  _Functor = _interopRequireDefault(_Functor);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

  function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  var
  /**
   * Returns boolean indicating whether given value is an
   * instance of monad or not.
   * @function module:monad.isMonad
   * @param value {any}
   * @returns {boolean}
   */
  _isMonad = function isMonad(value) {
    return value && value instanceof Monad;
  },

  /**
   * Always returns a monad;  If given value is not
   * a monad creates using given value.
   * @function module:functor.alwaysMonad
   * @param x {Monad|any} - Monad or any.
   * @returns {any}
   */
  alwaysMonad = function alwaysMonad(x) {
    return !x.map ? new Monad(x) : x;
  },

  /**
   * Calls `valueOf` on value (use for functional composition).
   * @function module.fjlDataCore.valueOf
   * @param x {any}
   * @returns {any}
   */
  valueOf = function valueOf(x) {
    return x.valueOf();
  },

  /**
   * Calls `valueOf` on given value.  Same as
   * monadic `join` operation (extracts inner value of
   * container/object).
   * @function module.fjlDataCore.join
   * @param x {any}
   * @returns {any}
   */
  join = valueOf,

  /**
   * Maps given function over given functor.
   * @function module.fjlDataCore.fmap
   * @param fn {Function}
   * @param x {Functor}
   * @returns {Functor}
   */
  fmap = (0, _fjl.curry)(function (fn, x) {
    return x.map(fn);
  }),

  /**
   * Applies function contained by applicative to contents of given functor.
   * (Same as functional applicative `apply`).
   * @function module.fjlDataCore.ap
   * @param applicative {Applicative}
   * @param functor {Functor}
   * @returns {Applicative}
   */
  ap = (0, _fjl.curry)(function (applicative, functor) {
    return applicative.ap(functor);
  }),

  /**
   * Flat maps a function over given monad's contained value.
   * @function module.fjlDataCore.flatMap
   * @param fn {Function}
   * @param monad {Monad}
   * @returns {Monad}
   */
  flatMap = (0, _fjl.curry)(function (fn, monad) {
    return monad.flatMap(fn);
  }),

  /**
   * A recursive monad un-wrapper (doesn't work on promises (for promises use `async` `await` (to unwrap))).  Unwraps monad to most inner contents (final inner value).
   * @function module:monad.getMonadUnWrapper
   * @param Type {Function}
   * @returns {Array.<any>} - [unWrapFunction, tailCallFuncName (used by `trampoline` @see module:fjl.trampoline)]
   */
  getMonadUnWrapper = function getMonadUnWrapper(Type) {
    return [function unWrapMonadByType(monad) {
      return (0, _fjl.instanceOf)(Type, monad) ? function trampolineCall() {
        return unWrapMonadByType(monad.valueOf());
      } : monad;
    }, 'trampolineCall'];
  };
  /**
   * @class module:monad.Monad
   * @param x {any}
   * @property value {any}
   */


  _exports.getMonadUnWrapper = getMonadUnWrapper;
  _exports.flatMap = flatMap;
  _exports.ap = ap;
  _exports.fmap = fmap;
  _exports.join = join;
  _exports.valueOf = valueOf;
  _exports.alwaysMonad = alwaysMonad;
  _exports.isMonad = _isMonad;

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

      /**
       * Monadic join - Removes one layer of monadic structure from value.
       * @memberOf module:monad.Monad
       * @returns {any}
       */
      value: function join() {
        return this.valueOf();
      }
      /**
       * Flat map operation.
       * @memberOf module:monad.Monad
       * @param fn {Function}
       * @returns {Monad}
       */

    }, {
      key: "flatMap",
      value: function flatMap(fn) {
        var out = Monad.unWrapMonadByType(this.constructor, fn(this.join()));
        return this.constructor.of(out);
      }
      /**
       * Same as `Monad.flatMap`.
       * @memberOf module:monad.Monad
       * @param fn {Function}
       * @returns {Monad}
       */

    }, {
      key: "chain",
      value: function chain(fn) {
        return this.flatMap(fn);
      }
      /**
       * Same as `new Monad(...)` just in 'static' function
       * format.
       * @memberOf module:monad.Monad
       * @static
       * @param x {any}
       * @returns {Monad}
       */

    }], [{
      key: "unWrapMonadByType",
      value: function unWrapMonadByType(Type, monad) {
        if (!(0, _fjl.isset)(monad)) {
          return monad;
        }

        var _getMonadUnWrapper = getMonadUnWrapper(Type),
            _getMonadUnWrapper2 = _slicedToArray(_getMonadUnWrapper, 2),
            unWrapper = _getMonadUnWrapper2[0],
            tailCallName = _getMonadUnWrapper2[1],
            unwrap = (0, _fjl.trampoline)(unWrapper, tailCallName);

        return unwrap(monad);
      }
    }, {
      key: "of",
      value: function of(x) {
        return new Monad(x);
      }
      /**
       * Checks for monad.
       * @memberOf module:monad.Monad
       * @static
       * @param x {any}
       * @returns {boolean}
       */

    }, {
      key: "isMonad",
      value: function isMonad(x) {
        return _isMonad(x);
      }
    }]);

    return Monad;
  }(_Applicative2.default);

  _exports.default = Monad;
});