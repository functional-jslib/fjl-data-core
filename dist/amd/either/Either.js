define(["exports", "fjl", "../maybe/Maybe", "../monad/Monad", "../utils"], function (_exports, _fjl, _Maybe, _Monad2, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.either = _exports.isLeft = _exports.isRight = _exports.Right = _exports.Left = void 0;
  _Monad2 = _interopRequireDefault(_Monad2);

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

  var Left =
  /*#__PURE__*/
  function (_Monad) {
    _inherits(Left, _Monad);

    function Left() {
      _classCallCheck(this, Left);

      return _possibleConstructorReturn(this, _getPrototypeOf(Left).apply(this, arguments));
    }

    _createClass(Left, null, [{
      key: "of",
      value: function of(x) {
        return new Left(x);
      }
    }]);

    return Left;
  }(_Monad2.default);

  _exports.Left = Left;

  var Right =
  /*#__PURE__*/
  function (_Just) {
    _inherits(Right, _Just);

    function Right() {
      _classCallCheck(this, Right);

      return _possibleConstructorReturn(this, _getPrototypeOf(Right).apply(this, arguments));
    }

    _createClass(Right, [{
      key: "map",
      value: function map(fn) {
        var value = this.valueOf();

        if (isLeft(value)) {
          return value;
        } else if (!(0, _fjl.isset)(value)) {
          return Left.of("TypeError: Cannot operate on `null` and/or `undefined`.  " + "Value given `".concat(value, "`."));
        }

        return Right.of(fn(value));
      }
    }], [{
      key: "of",
      value: function of(x) {
        return new Right(x);
      }
    }]);

    return Right;
  }(_Maybe.Just);

  _exports.Right = Right;

  var isRight = function isRight(x) {
    return x instanceof Right;
  },
      isLeft = function isLeft(x) {
    return x instanceof Left;
  },
      either = (0, _fjl.curry)(function (leftCallback, rightCallback, monad) {
    var identity = (0, _utils.alwaysFunctor)(monad).map(_fjl.id);

    switch (identity.constructor) {
      case Left:
        return identity.map((0, _utils.toFunction)(leftCallback)).join();

      case Right:
        return identity.map((0, _utils.toFunction)(rightCallback)).join();

      default:
        return Left.of(monad).map(leftCallback).join();
    }
  });

  _exports.either = either;
  _exports.isLeft = isLeft;
  _exports.isRight = isRight;
});