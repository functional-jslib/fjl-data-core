"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Just", {
  enumerable: true,
  get: function get() {
    return _Just.default;
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
    return _Nothing.default;
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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _getMonadUnWrapper = (0, _Monad.getMonadUnWrapper)(_Just.default),
    _getMonadUnWrapper2 = _slicedToArray(_getMonadUnWrapper, 2),
    justUnWrapper = _getMonadUnWrapper2[0],
    justUnWrapperTailCallName = _getMonadUnWrapper2[1];

var
/**
 * @param replacement {*}
 * @param fn {Function} - Some operation.
 * @param maybeInst {(Nothing|Just|*)} - Maybe instance or non
 */
maybe = (0, _fjl.curry)(function (replacement, fn, maybeInst) {
  var subject = (0, _fjl.isset)(maybeInst) && isMaybe(maybeInst) ? maybeInst.map(_fjl.id) : _Nothing.default.of();
  return (0, _Nothing.isNothing)(subject) ? replacement : subject.map(fn).join();
}),
    unWrapJust = (0, _fjl.trampoline)(justUnWrapper, justUnWrapperTailCallName),
    unWrapMaybe = function unWrapMaybe(x) {
  return (0, _Nothing.isNothing)(x) ? (0, _Nothing.nothing)() : unWrapJust(x);
},
    maybeEqual = (0, _fjl.curry)(function (a, b) {
  return unWrapMaybe(a) === unWrapMaybe(b);
}),
    isMaybe = function isMaybe(x) {
  return (0, _Nothing.isNothing)(x) || (0, _Just.isJust)(x);
},
    toMaybe = function toMaybe(x) {
  return (0, _fjl.isset)(x) ? (0, _Just.just)(x) : (0, _Nothing.nothing)();
};

exports.toMaybe = toMaybe;
exports.isMaybe = isMaybe;
exports.maybeEqual = maybeEqual;
exports.unWrapMaybe = unWrapMaybe;
exports.unWrapJust = unWrapJust;
exports.maybe = maybe;