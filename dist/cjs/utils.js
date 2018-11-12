"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alwaysFunctor = exports.toFunction = void 0;

var _fjl = require("fjl");

var _Functor = _interopRequireDefault(require("./functor/Functor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toFunction = function toFunction(x) {
  return (0, _fjl.isFunction)(x) ? x : function () {
    return x;
  };
},
    alwaysFunctor = function alwaysFunctor(x) {
  return !x.map ? new _Functor.default(x) : x;
};

exports.alwaysFunctor = alwaysFunctor;
exports.toFunction = toFunction;