define(["exports", "./Just", "./Nothing", "fjl"], function (_exports, _Just, _Nothing, _fjl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "Just", {
    enumerable: true,
    get: function get() {
      return _Just.default;
    }
  });
  Object.defineProperty(_exports, "isJust", {
    enumerable: true,
    get: function get() {
      return _Just.isJust;
    }
  });
  Object.defineProperty(_exports, "just", {
    enumerable: true,
    get: function get() {
      return _Just.just;
    }
  });
  Object.defineProperty(_exports, "Nothing", {
    enumerable: true,
    get: function get() {
      return _Nothing.default;
    }
  });
  Object.defineProperty(_exports, "isNothing", {
    enumerable: true,
    get: function get() {
      return _Nothing.isNothing;
    }
  });
  Object.defineProperty(_exports, "nothing", {
    enumerable: true,
    get: function get() {
      return _Nothing.nothing;
    }
  });
  _exports.toMaybe = _exports.isMaybe = _exports.maybe = void 0;
  _Just = _interopRequireWildcard(_Just);
  _Nothing = _interopRequireWildcard(_Nothing);

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

  _exports.toMaybe = toMaybe;
  _exports.isMaybe = isMaybe;
  _exports.maybe = maybe;
});