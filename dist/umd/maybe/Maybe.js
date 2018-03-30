'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isMaybe = exports.maybe = exports.Nothing = exports.isNothing = exports.isJust = exports.Just = undefined;

var _Just = require('./Just');

var _Just2 = _interopRequireDefault(_Just);

var _Nothing = require('./Nothing');

var _Nothing2 = _interopRequireDefault(_Nothing);

var _fjl = require('fjl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Just = _Just2.default;
exports.isJust = _Just.isJust;
exports.isNothing = _Nothing.isNothing;
exports.Nothing = _Nothing2.default;
var
/**
 * @param replacement {*}
 * @param fn {Function} - Some operation.
 * @param maybeInst {(Nothing|Just|*)} - Maybe instance or non
 */
maybe = exports.maybe = (0, _fjl.curry)(function (replacement, fn, maybeInst) {
    var subject = (0, _fjl.isset)(maybeInst) && isMaybe(maybeInst) ? maybeInst.map(_fjl.id) : _Nothing2.default.of();
    return (0, _Nothing.isNothing)(subject) ? replacement : subject.map(fn).join();
}),
    isMaybe = exports.isMaybe = function isMaybe(x) {
    return (0, _Nothing.isNothing)(x) || (0, _Just.isJust)(x);
};

function Maybe(x) {
    return (0, _fjl.isset)(x) ? _Just2.default.of(x) : _Nothing2.default.of();
}

Maybe.of = function (x) {
    return Maybe(x);
};

exports.default = Maybe;