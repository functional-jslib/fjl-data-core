(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./Nothing", "../monad/Monad", "fjl"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./Nothing"), require("../monad/Monad"), require("fjl"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Nothing, global.Monad, global.fjl);
    global.Just = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Nothing, _Monad2, _fjl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = _exports.toJust = _exports.just = _exports.isJust = void 0;
  _Nothing = _interopRequireWildcard(_Nothing);
  _Monad2 = _interopRequireDefault(_Monad2);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  var
  /**
   * Checks for `Just`.
   * @function module:maybe.isJust
   * @param x {*}
   * @returns {boolean}
   */
  isJust = function isJust(x) {
    return x instanceof Just;
  },

  /**
   * Functional constructor (function that returns an instance) for `Just` -
   * Same as `new Just(...)` (just shorter and can be used as a function).
   * @function module:maybe.just
   * @param x {Just|*}
   * @returns {Just}
   */
  just = function just(x) {
    return new Just(x);
  },

  /**
   * Ensures `Just`
   * @function module:maybe.toJust
   * @param x {Just|*}
   * @returns {Just}
   */
  toJust = function toJust(x) {
    return isJust(x) ? x : just(x);
  };
  /**
   * @class maybe.Just
   * @param x {*}
   * @property value {*}
   * @extends module:monad.Monad
   */


  _exports.toJust = toJust;
  _exports.just = just;
  _exports.isJust = isJust;

  var Just = /*#__PURE__*/function (_Monad) {
    _inherits(Just, _Monad);

    var _super = _createSuper(Just);

    function Just() {
      _classCallCheck(this, Just);

      return _super.apply(this, arguments);
    }

    _createClass(Just, [{
      key: "map",

      /**
       * Maps incoming function over contained value and
       * returns result wrapped in `Just`.
       * @method module:maybe.Just#map
       * @param fn {Function} - Unary operation.
       * @returns {Just|Nothing}
       */
      value: function map(fn) {
        var constructor = this.constructor,
            value = this.valueOf();
        return (0, _fjl.isset)(value) && !(0, _Nothing.isNothing)(value) ? constructor.of(fn(value)) : constructor.counterConstructor.of(value);
      }
      /**
       * Applicative pure - Same as `new Just(...)`.
       * @method module:maybe.Just.of
       * @static
       * @param x {*}
       * @returns {Just}
       */

    }], [{
      key: "of",
      value: function of(x) {
        return just(x);
      }
    }]);

    return Just;
  }(_Monad2["default"]);
  /**
   * @static
   * @member {Functor} module:maybe.Just.counterConstructor
   */


  _exports["default"] = Just;
  Just.counterConstructor = _Nothing["default"];
});