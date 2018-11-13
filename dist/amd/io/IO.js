define(["exports", "../monad/Monad", "fjl"], function (_exports, _Monad2, _fjl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _Monad2 = _interopRequireDefault(_Monad2);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  var IO =
  /*#__PURE__*/
  function (_Monad) {
    _inherits(IO, _Monad);

    _createClass(IO, null, [{
      key: "unWrapIO",
      value: function unWrapIO(io) {
        if (!IO.isIO(io)) {
          return io;
        }

        return _Monad2.default.unWrapMonadByType(IO, io);
      }
    }, {
      key: "of",
      value: function of(fn) {
        return new IO(fn);
      }
    }, {
      key: "isIO",
      value: function isIO(x) {
        return x instanceof IO;
      }
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

      return _possibleConstructorReturn(this, _getPrototypeOf(IO).call(this, (0, _fjl.toFunction)(fn)));
    }

    _createClass(IO, [{
      key: "flatMap",
      value: function flatMap(fn) {
        return (0, _fjl.compose)(this.constructor.of, IO.unWrapIO, fn, IO.unWrapIO)((0, _fjl.toFunction)(this.join())());
      }
    }, {
      key: "map",
      value: function map(fn) {
        return (0, _fjl.compose)(this.constructor.of, fn)((0, _fjl.toFunction)(this.valueOf())());
      }
    }]);

    return IO;
  }(_Monad2.default);

  _exports.default = IO;
});