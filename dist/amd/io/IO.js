define(["exports", "../monad/Monad", "fjl"], function (_exports, _Monad2, _fjl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _Monad2 = _interopRequireWildcard(_Monad2);

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

  /**
   * @class io.IO
   * @param fn {Function} - Operation to contain within `IO`
   * @property `value` {*} - `IO` however wraps non-function values to `function` on construction.
   * @extends module:monad.Monad
   */
  var IO = /*#__PURE__*/function (_Monad) {
    _inherits(IO, _Monad);

    var _super = _createSuper(IO);

    _createClass(IO, null, [{
      key: "unWrapIO",

      /**
       * Unwraps an `IO`.
       * @function module:io.IO.unWrapIO
       * @static
       * @param io {IO}
       * @returns {*}
       */
      value: function unWrapIO(io) {
        if (!IO.isIO(io)) {
          return io;
        }

        return (0, _Monad2.unWrapMonadByType)(IO, io);
      }
      /**
       * Applicative pure;  Same as `new IO(...)`.
       * @function module:io.IO.of
       * @static
       * @param fn {Function} - Unary operation.
       * @returns {IO}
       */

    }, {
      key: "of",
      value: function of(fn) {
        return new IO(fn);
      }
      /**
       * Checks for `IO`.
       * @function module:io.IO.isIO
       * @static
       * @param x {*}.
       * @returns {boolean}
       */

    }, {
      key: "isIO",
      value: function isIO(x) {
        return x instanceof IO;
      }
      /**
       * Performs io.
       * @function module:io.IO.isIO
       * @static
       * @param io {IO}.
       * @param args {...*} {IO}.
       * @returns {boolean}
       */

    }, {
      key: "do",
      value: function _do(io) {
        var instance = !IO.isIO(io) ? new IO(io) : io;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        return (0, _fjl.compose)(IO.of, IO.unWrapIO)((0, _fjl.toFunction)(instance.join()).apply(void 0, args));
      }
    }]);

    function IO(fn) {
      _classCallCheck(this, IO);

      return _super.call(this, (0, _fjl.toFunction)(fn));
    }
    /**
     * Maps incoming function onto contained, innermost, value
     * and returns a new `IO` which will containe the result of calling incoming function on originally contained value - A.k.a - flat-map operation.
     * @memberOf module:io.IO
     * @param fn {Function} - Unary operation.
     * @returns {IO}
     */


    _createClass(IO, [{
      key: "flatMap",
      value: function flatMap(fn) {
        return (0, _fjl.compose)(this.constructor.of, IO.unWrapIO, fn, IO.unWrapIO)((0, _fjl.toFunction)(this.join())());
      }
      /**
       * Maps incoming function on contained value and returns
       * a new `IO` container containing result of unary operation (incoming-function's result).
       * @memberOf module:io.IO
       * @param fn {Function}
       * @returns {IO}
       */

    }, {
      key: "map",
      value: function map(fn) {
        return (0, _fjl.compose)(this.constructor.of, fn)((0, _fjl.toFunction)(this.valueOf())());
      }
    }]);

    return IO;
  }(_Monad2["default"]);

  _exports["default"] = IO;
});