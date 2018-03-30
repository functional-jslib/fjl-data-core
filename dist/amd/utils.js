'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.alwaysFunctor = exports.toFunction = undefined;

var _fjl = require('fjl');

var _Functor = require('./functor/Functor');

var _Functor2 = _interopRequireDefault(_Functor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toFunction = exports.toFunction = function toFunction(x) {
    return (0, _fjl.isFunction)(x) ? x : function () {
        return x;
    };
},
    alwaysFunctor = exports.alwaysFunctor = function alwaysFunctor(x) {
    return !x.map ? new _Functor2.default(x) : x;
};