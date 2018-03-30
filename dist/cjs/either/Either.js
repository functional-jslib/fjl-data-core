'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Right = exports.Left = exports.either = exports.isLeft = exports.isRight = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fjl = require('fjl');

var _Maybe = require('../maybe/Maybe');

var _Monad2 = require('../monad/Monad');

var _Monad3 = _interopRequireDefault(_Monad2);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elyde on 12/10/2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Left = function (_Monad) {
    _inherits(Left, _Monad);

    function Left() {
        _classCallCheck(this, Left);

        return _possibleConstructorReturn(this, (Left.__proto__ || Object.getPrototypeOf(Left)).apply(this, arguments));
    }

    _createClass(Left, null, [{
        key: 'of',
        value: function of(x) {
            return new Left(x);
        }
    }]);

    return Left;
}(_Monad3.default);

var Right = function (_Just) {
    _inherits(Right, _Just);

    function Right() {
        _classCallCheck(this, Right);

        return _possibleConstructorReturn(this, (Right.__proto__ || Object.getPrototypeOf(Right)).apply(this, arguments));
    }

    _createClass(Right, [{
        key: 'map',
        value: function map(fn) {
            var value = this.valueOf();
            if (isLeft(value)) {
                return value;
            } else if (!(0, _fjl.isset)(value)) {
                return Left.of('TypeError: Cannot operate on `null` and/or `undefined`.  ' + ('Value given `' + value + '`.'));
            }
            return Right.of(fn(value));
        }
    }], [{
        key: 'of',
        value: function of(x) {
            return new Right(x);
        }
    }]);

    return Right;
}(_Maybe.Just);

var isRight = exports.isRight = function isRight(x) {
    return x instanceof Right;
},
    isLeft = exports.isLeft = function isLeft(x) {
    return x instanceof Left;
},
    either = exports.either = (0, _fjl.curry)(function (leftCallback, rightCallback, monad) {
    var identity = (0, _utils.alwaysFunctor)(monad).map(_fjl.id);
    switch (identity.constructor) {
        case Left:
            return identity.map((0, _utils.toFunction)(leftCallback)).join();
        case Right:
            return identity.map((0, _utils.toFunction)(rightCallback)).join();
        default:
            return Left.of(monad).map(leftCallback).join();
    }
});

exports.Left = Left;
exports.Right = Right;