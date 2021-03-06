(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./Apply"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./Apply"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Apply);
    global.Applicative = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Apply2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.apRight = _exports.apLeft = _exports.liftA2 = _exports.pureApp = _exports["default"] = void 0;
  _Apply2 = _interopRequireDefault(_Apply2);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
   * @class module:functor.Applicative
   * @extends module:functor.Apply
   */
  var Applicative = /*#__PURE__*/function (_Apply) {
    _inherits(Applicative, _Apply);

    var _super = _createSuper(Applicative);

    function Applicative() {
      _classCallCheck(this, Applicative);

      return _super.apply(this, arguments);
    }

    _createClass(Applicative, null, [{
      key: "of",

      /**
       * Constructs an applicative with given `value`.
       * @method module:functor.Applicative.of
       * @param value {*}
       * @returns {Applicative}
       * @static
       */
      value: function of(value) {
        return new Applicative(value);
      }
    }, {
      key: "liftA2",
      value: function liftA2(fn, appA, appB) {
        return appA.constructor.of(fn(appA.valueOf(), appB.valueOf));
      }
    }, {
      key: "apRight",
      value: function apRight(appA, appB) {
        return appB;
      }
    }, {
      key: "apLeft",
      value: function apLeft(appA, appB) {
        return appA;
      }
    }]);

    return Applicative;
  }(_Apply2["default"]);

  _exports["default"] = Applicative;
  var pureApp = Applicative.of,
      liftA2 = Applicative.liftA2,
      apLeft = Applicative.apLeft,
      apRight = Applicative.apRight;
  _exports.apRight = apRight;
  _exports.apLeft = apLeft;
  _exports.liftA2 = liftA2;
  _exports.pureApp = pureApp;
});