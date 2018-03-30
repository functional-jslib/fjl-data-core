'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isJust = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Nothing = require('./Nothing');

var _Nothing2 = _interopRequireDefault(_Nothing);

var _Monad2 = require('../monad/Monad');

var _Monad3 = _interopRequireDefault(_Monad2);

var _fjl = require('fjl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _isJust = function _isJust(x) {
    return x instanceof Just;
};

exports.isJust = _isJust;

var Just = function (_Monad) {
    _inherits(Just, _Monad);

    function Just() {
        _classCallCheck(this, Just);

        return _possibleConstructorReturn(this, (Just.__proto__ || Object.getPrototypeOf(Just)).apply(this, arguments));
    }

    _createClass(Just, [{
        key: 'map',
        value: function map(fn) {
            var constructor = this.constructor,
                value = this.valueOf();

            return (0, _fjl.isset)(value) && !(0, _Nothing.isNothing)(value) ? constructor.of(fn(value)) : constructor.counterConstructor.of(value);
        }
    }], [{
        key: 'of',
        value: function of(x) {
            return new Just(x);
        }
    }, {
        key: 'isJust',
        value: function isJust(x) {
            return _isJust(x);
        }
    }]);

    return Just;
}(_Monad3.default);

exports.default = Just;


Just.counterConstructor = _Nothing2.default;