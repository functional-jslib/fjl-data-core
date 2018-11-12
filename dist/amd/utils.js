define(["exports", "fjl", "./functor/Functor"], function (_exports, _fjl, _Functor) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.alwaysFunctor = _exports.toFunction = void 0;
  _Functor = _interopRequireDefault(_Functor);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var toFunction = function toFunction(x) {
    return (0, _fjl.isFunction)(x) ? x : function () {
      return x;
    };
  },
      alwaysFunctor = function alwaysFunctor(x) {
    return !x.map ? new _Functor.default(x) : x;
  };

  _exports.alwaysFunctor = alwaysFunctor;
  _exports.toFunction = toFunction;
});