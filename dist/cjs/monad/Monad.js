'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.trampoline = exports.getMonadUnWrapper = exports.flatMap = exports.ap = exports.fmap = exports.join = exports.valueOf = exports.isMonad = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fjl = require('fjl');

var _Applicative2 = require('../functor/Applicative');

var _Applicative3 = _interopRequireDefault(_Applicative2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by edlc on 12/9/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Basic `Monad` class.  Used to extend from to create `Maybe` and `Either` module/classes.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module Monad
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @see `Maybe` reference: http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Maybe.html
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @see `Either` reference: http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Either.html
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _isMonad = function _isMonad(value) {
    return value instanceof Monad;
},
    valueOf = function valueOf(x) {
    return x.valueOf();
},
    join = function join(x) {
    return x.join();
},
    fmap = (0, _fjl.curry)(function (fn, x) {
    return x.map(fn);
}),
    ap = (0, _fjl.curry)(function (applicative, functor) {
    return applicative.ap(functor);
}),
    flatMap = (0, _fjl.curry)(function (fn, monad) {
    return monad.flatMap(fn);
}),
    getMonadUnWrapper = function getMonadUnWrapper(Type) {
    var isTypeToUnWrap = (0, _fjl.instanceOf)(Type);
    return function unWrapMonadByType(monad) {
        return isTypeToUnWrap(monad) ? function trampolineCall() {
            return unWrapMonadByType(monad.valueOf());
        } : monad;
    };
},
    trampoline = function trampoline(fn) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var result = (0, _fjl.apply)(fn, args);
        while ((0, _fjl.isset)(result) && result.name === 'trampolineCall' && (0, _fjl.isFunction)(result)) {
            result = result();
        }
        return result;
    };
};

exports.isMonad = _isMonad;
exports.valueOf = valueOf;
exports.join = join;
exports.fmap = fmap;
exports.ap = ap;
exports.flatMap = flatMap;
exports.getMonadUnWrapper = getMonadUnWrapper;
exports.trampoline = trampoline;

var Monad = function (_Applicative) {
    _inherits(Monad, _Applicative);

    function Monad() {
        _classCallCheck(this, Monad);

        return _possibleConstructorReturn(this, (Monad.__proto__ || Object.getPrototypeOf(Monad)).apply(this, arguments));
    }

    _createClass(Monad, [{
        key: 'join',
        value: function join() {
            return Monad.unWrapMonadByType(this.constructor, this);
        }
    }, {
        key: 'flatMap',
        value: function flatMap(fn) {
            var out = Monad.unWrapMonadByType(this.constructor, fn(this.join()));
            return this.constructor.of(out);
        }
    }, {
        key: 'chain',
        value: function chain(fn) {
            return this.flatMap(fn);
        }
    }], [{
        key: 'unWrapMonadByType',
        value: function unWrapMonadByType(Type, monad) {
            if (!(0, _fjl.isset)(monad)) {
                return monad;
            }
            var unwrap = trampoline(getMonadUnWrapper(Type));
            return unwrap(monad);
        }
    }, {
        key: 'of',
        value: function of(x) {
            return new Monad(x);
        }
    }, {
        key: 'isMonad',
        value: function isMonad(x) {
            return _isMonad(x);
        }
    }]);

    return Monad;
}(_Applicative3.default);

exports.default = Monad;