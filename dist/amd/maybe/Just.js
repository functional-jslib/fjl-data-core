define(["exports", "./Nothing", "../monad/Monad", "fjl"], function (_exports, _Nothing, _Monad2, _fjl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.just = _exports.isJust = void 0;
  _Nothing = _interopRequireWildcard(_Nothing);
  _Monad2 = _interopRequireDefault(_Monad2);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  var _isJust = function isJust(x) {
    return x instanceof Just;
  },
      just = function just(x) {
    return new Just(x);
  };

  _exports.just = just;
  _exports.isJust = _isJust;

  var Just =
  /*#__PURE__*/
  function (_Monad) {
    _inherits(Just, _Monad);

    function Just() {
      _classCallCheck(this, Just);

      return _possibleConstructorReturn(this, _getPrototypeOf(Just).apply(this, arguments));
    }

    _createClass(Just, [{
      key: "map",
      value: function map(fn) {
        var constructor = this.constructor,
            value = this.valueOf();
        return (0, _fjl.isset)(value) && !(0, _Nothing.isNothing)(value) ? constructor.of(fn(value)) : constructor.counterConstructor.of(value);
      }
    }], [{
      key: "of",
      value: function of(x) {
        return just(x);
      }
    }, {
      key: "isJust",
      value: function isJust(x) {
        return _isJust(x);
      }
    }]);

    return Just;
  }(_Monad2.default);

  _exports.default = Just;
  Just.counterConstructor = _Nothing.default;
});