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
})(this, function (_exports, _Apply2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _Apply2 = _interopRequireDefault(_Apply2);

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

  /**
   * @class module:functor.Applicative
   * @extends module:functor.Apply
   */
  var Applicative =
  /*#__PURE__*/
  function (_Apply) {
    _inherits(Applicative, _Apply);

    function Applicative() {
      _classCallCheck(this, Applicative);

      return _possibleConstructorReturn(this, _getPrototypeOf(Applicative).apply(this, arguments));
    }

    _createClass(Applicative, null, [{
      key: "of",

      /**
       * Constructs an applicative with given `value`.
       * @function module:functor.Applicative.of
       * @static
       * @param value {*}
       * @returns {Applicative}
       */
      value: function of(value) {
        return new Applicative(value);
      }
    }]);

    return Applicative;
  }(_Apply2.default);

  _exports.default = Applicative;
});