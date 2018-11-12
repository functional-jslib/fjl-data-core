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
exports.toMaybe = exports.isMaybe = exports.maybe = void 0;

var _Just = _interopRequireWildcard(require("./Just"));

var _Nothing = _interopRequireWildcard(require("./Nothing"));

var _fjl = require("fjl");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
    isMaybe = function isMaybe(x) {
  return (0, _Nothing.isNothing)(x) || (0, _Just.isJust)(x);
},
    toMaybe = function toMaybe(x) {
  return (0, _fjl.isset)(x) ? (0, _Just.just)(x) : (0, _Nothing.nothing)();
};

exports.toMaybe = toMaybe;
exports.isMaybe = isMaybe;
exports.maybe = maybe;