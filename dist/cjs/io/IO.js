/**
 * Created by elydelacruz on 2/19/2017.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Monad2 = require('../monad/Monad');

var _Monad3 = _interopRequireDefault(_Monad2);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IO = function (_Monad) {
    _inherits(IO, _Monad);

    function IO(fn) {
        _classCallCheck(this, IO);

        return _possibleConstructorReturn(this, (IO.__proto__ || Object.getPrototypeOf(IO)).call(this, (0, _utils.toFunction)(fn)));
    }

    _createClass(IO, [{
        key: 'flatMap',
        value: function flatMap(fn) {
            var out = fn(this.join()());
            return !(out instanceof this.constructor) ? IO.of(out) : out;
        }

        // map (fn) {
        //     return this.flatMap(x => IO.of(fn(x)));
        // }

    }, {
        key: 'fork',
        value: function fork() {
            return this.map(function (fn) {
                return fn();
            });
        }
    }, {
        key: 'unsafePerformIO',
        value: function unsafePerformIO() {
            return IO.of(this.join().apply(undefined, arguments));
        }
    }], [{
        key: 'of',
        value: function of(fn) {
            return new IO(fn);
        }
    }, {
        key: 'isIO',
        value: function isIO(x) {
            return x instanceof IO;
        }
    }, {
        key: 'do',
        value: function _do(io) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            return (IO.isIO(io) ? io : IO.of(io)).unsafePerformIO.apply(io, args);
        }
    }]);

    return IO;
}(_Monad3.default);

exports.default = IO;