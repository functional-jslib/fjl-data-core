"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Just", {
  enumerable: true,
  get: function get() {
    return _Just["default"];
  }
});
Object.defineProperty(exports, "isJust", {
  enumerable: true,
  get: function get() {
    return _Just.isJust;
  }
});
Object.defineProperty(exports, "just", {
  enumerable: true,
  get: function get() {
    return _Just.just;
  }
});
Object.defineProperty(exports, "Nothing", {
  enumerable: true,
  get: function get() {
    return _Nothing["default"];
  }
});
Object.defineProperty(exports, "isNothing", {
  enumerable: true,
  get: function get() {
    return _Nothing.isNothing;
  }
});
Object.defineProperty(exports, "nothing", {
  enumerable: true,
  get: function get() {
    return _Nothing.nothing;
  }
});
exports.toMaybe = exports.isMaybe = exports.maybeEqual = exports.unWrapMaybe = exports.unWrapJust = exports.maybe = void 0;

var _Just = _interopRequireWildcard(require("./Just"));

var _Nothing = _interopRequireWildcard(require("./Nothing"));

var _fjl = require("fjl");

var _Monad = require("../monad/Monad");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _getMonadUnWrapper = (0, _Monad.getMonadUnWrapper)(_Just["default"]),
    _getMonadUnWrapper2 = _slicedToArray(_getMonadUnWrapper, 2),
    justUnWrapper = _getMonadUnWrapper2[0],
    justUnWrapperTailCallName = _getMonadUnWrapper2[1];

var
/**
 * The maybe function takes a `replacement` value, a function (unary operation), and a Maybe value. If the Maybe value is `Nothing`, the function returns the `replacement` value. Otherwise, it applies the function to the value contained  by the `Just` and returns the result.
 * @function module:maybe.maybe
 * @param replacement {*}
 * @param fn {Function} - Unary operation.
 * @param maybeInst {(Nothing|Just|*)} - Maybe instance or non-maybe value.
 * @returns {*}
 */
maybe = (0, _fjl.curry)(function (replacement, fn, maybeInst) {
  var subject = (0, _fjl.isset)(maybeInst) && isMaybe(maybeInst) ? maybeInst.map(_fjl.id) : (0, _Nothing.nothing)();
  return (0, _Nothing.isNothing)(subject) ? replacement : subject.map(fn).join();
}),

/**
 * Unwraps just (recursively).
 * @function module:maybe.unWrapJust
 * @param x {*} - Expected `Just`.
 * @returns {*}
 */
unWrapJust = (0, _fjl.trampoline)(justUnWrapper, justUnWrapperTailCallName),

/**
 * Unwraps maybe (recursively).
 * @function module:maybe.unWrapMaybe
 * @param x {*} - Expected `Maybe`.
 * @returns {*}
 */
unWrapMaybe = function unWrapMaybe(x) {
  return (0, _Nothing.isNothing)(x) ? (0, _Nothing.nothing)() : unWrapJust(x);
},

/**
 * Equality operator for maybes.
 * @function module:maybe.maybeEqual
 * @param a {*} - Maybe 1.
 * @param b {*} - Maybe 2.
 * @returns {boolean}
 */
maybeEqual = (0, _fjl.curry)(function (a, b) {
  return unWrapMaybe(a) === unWrapMaybe(b);
}),

/**
 * Checks for maybe.
 * @function module:maybe.isMaybe
 *  @param x {*}.
 * @returns {boolean}
 */
isMaybe = function isMaybe(x) {
  return (0, _Nothing.isNothing)(x) || (0, _Just.isJust)(x);
},

/**
 * Creates maybe from value.
 * @function module:maybe.toMaybe
 * @param x {*}
 * @returns {Maybe} - `Just` or `Nothing` based on value.
 */
toMaybe = function toMaybe(x) {
  if (!(0, _fjl.isset)(x)) {
    return (0, _Nothing.nothing)();
  }

  return isMaybe(x) ? x : (0, _Just.just)(x);
};

exports.toMaybe = toMaybe;
exports.isMaybe = isMaybe;
exports.maybeEqual = maybeEqual;
exports.unWrapMaybe = unWrapMaybe;
exports.unWrapJust = unWrapJust;
exports.maybe = maybe;