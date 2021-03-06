"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.either = exports.toEither = exports.toLeft = exports.toRight = exports.isLeft = exports.isRight = exports.right = exports.left = exports.Right = exports.Left = void 0;

var _fjl = require("fjl");

var _Maybe = require("../maybe/Maybe");

var _Monad2 = _interopRequireDefault(require("../monad/Monad"));

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
 * `Left` representation of `Either` construct.
 * @class module:either.Left
 * @param x {*}
 * @property value {*}
 * @extends module:monad.Monad
 */
var Left = /*#__PURE__*/function (_Monad) {
  _inherits(Left, _Monad);

  var _super = _createSuper(Left);

  function Left() {
    _classCallCheck(this, Left);

    return _super.apply(this, arguments);
  }

  _createClass(Left, null, [{
    key: "of",

    /**
     * Same as `new Left(...)`.
     * @method module:either.Left.of
     * @static
     * @param x {*}
     * @returns {Left}
     */
    value: function of(x) {
      return new Left(x);
    }
  }]);

  return Left;
}(_Monad2["default"]);
/**
 * @class module:either.Right
 * @param x {*}
 * @property value {*}
 * @extends module:maybe.Just
 */


exports.Left = Left;

var Right = /*#__PURE__*/function (_Just) {
  _inherits(Right, _Just);

  var _super2 = _createSuper(Right);

  function Right() {
    _classCallCheck(this, Right);

    return _super2.apply(this, arguments);
  }

  _createClass(Right, [{
    key: "map",

    /**
     * Maps a function over contained value and returns result wrapped.
     * @method module:either.Right#map
     * @param fn {Function} - Unary operation.
     * @returns {Either}
     */
    value: function map(fn) {
      var value = this.valueOf();

      if (isLeft(value)) {
        return value;
      } else if (!(0, _fjl.isset)(value)) {
        return Left.of("TypeError: Cannot operate on `".concat(value, "`."));
      }

      return Right.of(fn(value));
    }
    /**
     * Same as `new Right(...)`.
     * @method module:either.Right.of
     * @static
     * @param x {*}
     * @returns {Right}
     */

  }], [{
    key: "of",
    value: function of(x) {
      return new Right(x);
    }
  }]);

  return Right;
}(_Maybe.Just);

exports.Right = Right;

var
/**
 * Returns a new `Left`
 * @function module:either.left
 * @param x {*}
 * @returns {Left}
 */
left = function left(x) {
  return new Left(x);
},

/**
 * Returns a `Right`.
 * @function module:either.right
 * @param x {*}
 * @returns {Right}
 */
right = function right(x) {
  return new Right(x);
},

/**
 * Checks for instance of `Right` constructor.
 * @function module:either.isRight
 * @param x {*}
 * @returns {boolean}
 */
isRight = function isRight(x) {
  return x instanceof Right;
},

/**
 * Checks for instance of `Left` constructor.
 * @function module:either.isLeft
 * @param x {*}
 * @returns {boolean}
 */
isLeft = function isLeft(x) {
  return x instanceof Left;
},

/**
 * Returns a `Right` - if not a `Right` creates one from given, else returns given.
 * @function module:either.toRight
 * @param x {*}
 * @returns {Right}
 */
toRight = function toRight(x) {
  return isRight(x) ? x : right(x);
},

/**
 * Returns a `Left` - if not a `Left` creates one from given, else returns given.
 * @function module:either.toLeft
 * @param x {*}
 * @returns {Left}
 */
toLeft = function toLeft(x) {
  return isLeft(x) ? x : left(x);
},

/**
 * Converts given to an either (`Right`|`Left`)
 * @function module:either.toEither
 * @param x {*}
 * @returns {Left|Right}
 */
toEither = function toEither(x) {
  return isLeft(x) || isRight(x) ? x : right(x).map(_fjl.id);
},

/**
 * Calls matching callback on incoming `Either`'s type;  If is a `Left`
 * (after mapping identity func on it) then calls left-callback and unwraps result
 * else calls right-callback and does the same.  Think of it like a functional
 * ternary statement (lol).
 * @function module:either.either
 * @param leftCallback {Function} - Mapped over value of `monad`'s identity.
 * @param rightCallback {Function} - "".
 * @param _either_ {Either|*}
 * @return {*} - Value of unwrapped resulting value of `flatMap`ped, passed-in callback's on passed in monad.
 * @example
 * expect(
     either(() => 404, () => 200, compose(right, right, right, right)(true))
   ).toEqual(undefined);
 */
either = (0, _fjl.curry)(function (leftCallback, rightCallback, _either_) {
  var identity = toEither(_either_).flatMap(_fjl.id),
      out = isRight(_either_) ? identity.flatMap((0, _fjl.toFunction)(rightCallback)) : identity.flatMap(leftCallback);
  return (0, _fjl.isset)(out) ? out.join() : out;
});

exports.either = either;
exports.toEither = toEither;
exports.toLeft = toLeft;
exports.toRight = toRight;
exports.isLeft = isLeft;
exports.isRight = isRight;
exports.right = right;
exports.left = left;