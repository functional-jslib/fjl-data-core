'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Functor2 = require('./Functor');

var _Functor3 = _interopRequireDefault(_Functor2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by edlc on 12/9/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Bifunctor = function (_Functor) {
    _inherits(Bifunctor, _Functor);

    function Bifunctor(value1, value2) {
        _classCallCheck(this, Bifunctor);

        var _this = _possibleConstructorReturn(this, (Bifunctor.__proto__ || Object.getPrototypeOf(Bifunctor)).call(this, value1));

        _this.value2 = value2;
        return _this;
    }

    _createClass(Bifunctor, [{
        key: 'value2Of',
        value: function value2Of() {
            return this.value2;
        }
    }, {
        key: 'first',
        value: function first(fn) {
            return new this.constructor(fn(this.valueOf()), this.value2Of());
        }
    }, {
        key: 'second',
        value: function second(fn) {
            return new this.constructor(this.valueOf(), fn(this.value2Of()));
        }
    }, {
        key: 'bimap',
        value: function bimap(fn1, fn2) {
            return new this.constructor(fn1(this.valueOf()), fn2(this.value2Of()));
        }
    }]);

    return Bifunctor;
}(_Functor3.default);

exports.default = Bifunctor;