var fjlDataCore = (function (exports,fjl) {
'use strict';

function _AwaitValue(value) {
  this.wrapped = value;
}

function _AsyncGenerator(gen) {
  var front, back;

  function send(key, arg) {
    return new Promise(function (resolve, reject) {
      var request = {
        key: key,
        arg: arg,
        resolve: resolve,
        reject: reject,
        next: null
      };

      if (back) {
        back = back.next = request;
      } else {
        front = back = request;
        resume(key, arg);
      }
    });
  }

  function resume(key, arg) {
    try {
      var result = gen[key](arg);
      var value = result.value;
      var wrappedAwait = value instanceof _AwaitValue;
      Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) {
        if (wrappedAwait) {
          resume("next", arg);
          return;
        }

        settle(result.done ? "return" : "normal", arg);
      }, function (err) {
        resume("throw", err);
      });
    } catch (err) {
      settle("throw", err);
    }
  }

  function settle(type, value) {
    switch (type) {
      case "return":
        front.resolve({
          value: value,
          done: true
        });
        break;

      case "throw":
        front.reject(value);
        break;

      default:
        front.resolve({
          value: value,
          done: false
        });
        break;
    }

    front = front.next;

    if (front) {
      resume(front.key, front.arg);
    } else {
      back = null;
    }
  }

  this._invoke = send;

  if (typeof gen.return !== "function") {
    this.return = undefined;
  }
}

if (typeof Symbol === "function" && Symbol.asyncIterator) {
  _AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
    return this;
  };
}

_AsyncGenerator.prototype.next = function (arg) {
  return this._invoke("next", arg);
};

_AsyncGenerator.prototype.throw = function (arg) {
  return this._invoke("throw", arg);
};

_AsyncGenerator.prototype.return = function (arg) {
  return this._invoke("return", arg);
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

/**
 * Functor class and associated operations.
 * Created by edlc on 12/9/16.
 * @module functor
 */

/**
 * Always returns a functor;  If given value is not
 * a functor creates one and passes given value to it.
 * @function module:functor.alwaysFunctor
 * @param x {{map: Function}|any} - Functor or any.
 * @returns {any}
 */

/**
 * Plain old functor class.
 * @class module:functor.Functor
 * @param value {any}
 * @property value {any}
 */

var Functor =
/*#__PURE__*/
function () {
  /**
   * @memberOf module:functor.Functor
   * @param value {any}
   */
  function Functor(value) {
    _classCallCheck(this, Functor);

    this.value = value;
  }
  /**
   * Extracts value of functor (same as monadic `join`).
   * @memberOf module:functor.Functor
   * @returns {any}
   */


  _createClass(Functor, [{
    key: "valueOf",
    value: function valueOf() {
      return this.value;
    }
    /**
     * Maps a function over contents of functor.
     * @memberOf module:functor.Functor
     * @param fn {Function} - Function that takes one `any` and returns one `any`.
     * @returns {Functor}
     */

  }, {
    key: "map",
    value: function map(fn) {
      return new this.constructor(fn(this.valueOf()));
    }
    /**
     * Same as `#Functor.map`.
     * @memberOf module:functor.Functor
     * @param fn {Function}
     * @returns {Functor}
     */

  }, {
    key: "fmap",
    value: function fmap(fn) {
      return this.map(fn);
    }
  }]);

  return Functor;
}();

/**
 * Contains `Applicative`'s `Apply` class (class that contains `ap` (a.k.a. `pure`) method).
 * Created by edlc on 12/9/16.
 * @memberOf module:functor
 */
/**
 * Apply construct.
 * @class module:functor.Apply
 * @param fn {Function|*}
 * @property value {any}
 * @extends module:functor.Functor
 */

var Apply =
/*#__PURE__*/
function (_Functor) {
  _inherits(Apply, _Functor);

  function Apply() {
    _classCallCheck(this, Apply);

    return _possibleConstructorReturn(this, _getPrototypeOf(Apply).apply(this, arguments));
  }

  _createClass(Apply, [{
    key: "ap",

    /**
     * Applicative apply operation - applies contained function over passed in functor.
     * @memberOf module:functor.Apply
     * @param x {Functor}
     * @returns {Apply}
     */
    value: function ap(x) {
      return x.map(fjl.toFunction(this.valueOf()));
    }
  }]);

  return Apply;
}(Functor);

/**
 * Created by edlc on 12/9/16.
 * Applicative class module.
 * @memberOf module:functor
 */
/**
 * @class module:functor.Applicative
 * @extends module:functor.Apply
 */

var Applicative =
/*#__PURE__*/
function (_Apply) {
  _inherits(Applicative, _Apply);

  function Applicative() {
    _classCallCheck(this, Applicative);

    return _possibleConstructorReturn(this, _getPrototypeOf(Applicative).apply(this, arguments));
  }

  _createClass(Applicative, null, [{
    key: "of",

    /**
     * Constructs an applicative with given `value`.
     * @function module:functor.Applicative.of
     * @static
     * @param value {any}
     * @returns {Applicative}
     */
    value: function of(value) {
      return new Applicative(value);
    }
  }]);

  return Applicative;
}(Apply);

/**
 * Created by edlc on 12/9/16.
 * @memberOf module:functor
 */
var Bifunctor =
/*#__PURE__*/
function (_Functor) {
  _inherits(Bifunctor, _Functor);

  function Bifunctor(value1, value2) {
    var _this;

    _classCallCheck(this, Bifunctor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Bifunctor).call(this, value1));
    _this.value2 = value2;
    return _this;
  }

  _createClass(Bifunctor, [{
    key: "value2Of",
    value: function value2Of() {
      return this.value2;
    }
  }, {
    key: "first",
    value: function first(fn) {
      return new this.constructor(fn(this.valueOf()), this.value2Of());
    }
  }, {
    key: "second",
    value: function second(fn) {
      return new this.constructor(this.valueOf(), fn(this.value2Of()));
    }
  }, {
    key: "bimap",
    value: function bimap(fn1, fn2) {
      return new this.constructor(fn1(this.valueOf()), fn2(this.value2Of()));
    }
  }]);

  return Bifunctor;
}(Functor);

/**
 * Created by edlc on 12/9/16.
 * Contains basic `Monad` class and associated methods.
 * For 'what is a monad'/back-story
 * @see `Maybe` reference: [http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Maybe.html](http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Maybe.html)
 * @see `Either` reference: [http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Either.html](http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Either.html)
 * @module monad
 */
var _isMonad = function isMonad(value) {
  return value && value instanceof Monad;
};
var alwaysMonad = function alwaysMonad(x) {
  return !x.map ? new Monad(x) : x;
};
var valueOf = function valueOf(x) {
  return x.valueOf();
};
var join = valueOf;
var fmap = fjl.curry(function (fn, x) {
  return x.map(fn);
});
var ap = fjl.curry(function (applicative, functor) {
  return applicative.ap(functor);
});
var flatMap = fjl.curry(function (fn, monad) {
  return monad.flatMap(fn);
});
var getMonadUnWrapper = function getMonadUnWrapper(Type) {
  return [function unWrapMonadByType(monad) {
    return fjl.instanceOf(Type, monad) ? function trampolineCall() {
      return unWrapMonadByType(monad.valueOf());
    } : monad;
  }, 'trampolineCall'];
};
var Monad =
/*#__PURE__*/
function (_Applicative) {
  _inherits(Monad, _Applicative);

  function Monad() {
    _classCallCheck(this, Monad);

    return _possibleConstructorReturn(this, _getPrototypeOf(Monad).apply(this, arguments));
  }

  _createClass(Monad, [{
    key: "join",

    /**
     * Monadic join - Removes one layer of monadic structure from value.
     * @memberOf module:monad.Monad
     * @returns {any}
     */
    value: function join() {
      return this.valueOf();
    }
    /**
     * Flat map operation.
     * @memberOf module:monad.Monad
     * @param fn {Function}
     * @returns {Monad}
     */

  }, {
    key: "flatMap",
    value: function flatMap(fn) {
      var out = Monad.unWrapMonadByType(this.constructor, fn(this.join()));
      return this.constructor.of(out);
    }
    /**
     * Same as `Monad.flatMap`.
     * @memberOf module:monad.Monad
     * @param fn {Function}
     * @returns {Monad}
     */

  }, {
    key: "chain",
    value: function chain(fn) {
      return this.flatMap(fn);
    }
    /**
     * Same as `new Monad(...)` just in 'static' function
     * format.
     * @memberOf module:monad.Monad
     * @static
     * @param x {any}
     * @returns {Monad}
     */

  }], [{
    key: "unWrapMonadByType",
    value: function unWrapMonadByType(Type, monad) {
      if (!fjl.isset(monad)) {
        return monad;
      }

      var _getMonadUnWrapper = getMonadUnWrapper(Type),
          _getMonadUnWrapper2 = _slicedToArray(_getMonadUnWrapper, 2),
          unWrapper = _getMonadUnWrapper2[0],
          tailCallName = _getMonadUnWrapper2[1],
          unwrap = fjl.trampoline(unWrapper, tailCallName);

      return unwrap(monad);
    }
  }, {
    key: "of",
    value: function of(x) {
      return new Monad(x);
    }
    /**
     * Checks for monad.
     * @memberOf module:monad.Monad
     * @static
     * @param x {any}
     * @returns {boolean}
     */

  }, {
    key: "isMonad",
    value: function isMonad(x) {
      return _isMonad(x);
    }
  }]);

  return Monad;
}(Applicative);

/**
 * Created by elydelacruz on 2/19/2017.
 */
var IO =
/*#__PURE__*/
function (_Monad) {
  _inherits(IO, _Monad);

  _createClass(IO, null, [{
    key: "unWrapIO",
    value: function unWrapIO(io) {
      if (!IO.isIO(io)) {
        return io;
      }

      return Monad.unWrapMonadByType(IO, io);
    }
  }, {
    key: "of",
    value: function of(fn) {
      return new IO(fn);
    }
  }, {
    key: "isIO",
    value: function isIO(x) {
      return x instanceof IO;
    }
  }, {
    key: "do",
    value: function _do(io) {
      var instance = !IO.isIO(io) ? new IO(io) : io;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return fjl.compose(IO.of, IO.unWrapIO)(fjl.toFunction(instance.join()).apply(void 0, args));
    }
  }]);

  function IO(fn) {
    _classCallCheck(this, IO);

    return _possibleConstructorReturn(this, _getPrototypeOf(IO).call(this, fjl.toFunction(fn)));
  }

  _createClass(IO, [{
    key: "flatMap",
    value: function flatMap$$1(fn) {
      return fjl.compose(this.constructor.of, IO.unWrapIO, fn, IO.unWrapIO)(fjl.toFunction(this.join())());
    }
  }, {
    key: "map",
    value: function map(fn) {
      return fjl.compose(this.constructor.of, fn)(fjl.toFunction(this.valueOf())());
    }
  }]);

  return IO;
}(Monad);

var NothingSingleton;

function Nothing() {
  if (NothingSingleton) {
    return NothingSingleton;
  } else if (!(this instanceof Nothing)) {
    return new Nothing();
  }

  NothingSingleton = this;
  Object.freeze(NothingSingleton);
}

var isNothing = function isNothing(x) {
  return x === NothingSingleton;
};
var nothing = function nothing() {
  return new Nothing();
};
var returnThis = function returnThis() {
  return this;
};
var prototype = Nothing.prototype; // Methods


prototype.valueOf = returnThis;
prototype.join = returnThis;
prototype.map = returnThis;
prototype.ap = returnThis;
prototype.flatMap = returnThis; // Set statics

Nothing.of = function () {
  return new Nothing();
};

Nothing.isNothing = isNothing;
Nothing.nothing = nothing; // Object.freeze makes properties on object immutable
// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
// Saves us from having to do the following (great!):
// Object.defineProperties(Nothing, {
//     of: {value: () => new Nothing(), enumerable: true},
//     isNothing: {value: isNothing, enumerable: true}
// });

Object.freeze(Nothing);

var _isJust = function isJust(x) {
  return x instanceof Just;
};
var just = function just(x) {
  return new Just(x);
};

var Just =
/*#__PURE__*/
function (_Monad) {
  _inherits(Just, _Monad);

  function Just() {
    _classCallCheck(this, Just);

    return _possibleConstructorReturn(this, _getPrototypeOf(Just).apply(this, arguments));
  }

  _createClass(Just, [{
    key: "map",
    value: function map(fn) {
      var constructor = this.constructor,
          value = this.valueOf();
      return fjl.isset(value) && !isNothing(value) ? constructor.of(fn(value)) : constructor.counterConstructor.of(value);
    }
  }], [{
    key: "of",
    value: function of(x) {
      return just(x);
    }
  }, {
    key: "isJust",
    value: function isJust(x) {
      return _isJust(x);
    }
  }]);

  return Just;
}(Monad);

Just.counterConstructor = Nothing;

var _getMonadUnWrapper = getMonadUnWrapper(Just);
var _getMonadUnWrapper2 = _slicedToArray(_getMonadUnWrapper, 2);
var justUnWrapper = _getMonadUnWrapper2[0];
var justUnWrapperTailCallName = _getMonadUnWrapper2[1];

var maybe = fjl.curry(function (replacement, fn, maybeInst) {
  var subject = fjl.isset(maybeInst) && isMaybe(maybeInst) ? maybeInst.map(fjl.id) : Nothing.of();
  return isNothing(subject) ? replacement : subject.map(fn).join();
});
var unWrapJust = fjl.trampoline(justUnWrapper, justUnWrapperTailCallName);
var unWrapMaybe = function unWrapMaybe(x) {
  return isNothing(x) ? nothing() : unWrapJust(x);
};
var maybeEqual = fjl.curry(function (a, b) {
  return unWrapMaybe(a) === unWrapMaybe(b);
});
var isMaybe = function isMaybe(x) {
  return isNothing(x) || _isJust(x);
};
var toMaybe = function toMaybe(x) {
  return fjl.isset(x) ? just(x) : nothing();
};

/**
 * Contains `Either` constructs (`Right`, `Left`,  `either` etc.) and associated operations.
 * Created by elyde on 12/10/2016.
 * @module either
 */
/**
 * `Left` representation of `Either` construct.
 * @class Left
 * @param x {any}
 * @property value {any}
 */

var Left =
/*#__PURE__*/
function (_Monad) {
  _inherits(Left, _Monad);

  function Left() {
    _classCallCheck(this, Left);

    return _possibleConstructorReturn(this, _getPrototypeOf(Left).apply(this, arguments));
  }

  _createClass(Left, null, [{
    key: "of",
    value: function of(x) {
      return new Left(x);
    }
  }]);

  return Left;
}(Monad);
/**
 * @class Right
 * @param x {any}
 * @property value {any}
 */

var Right =
/*#__PURE__*/
function (_Just) {
  _inherits(Right, _Just);

  function Right() {
    _classCallCheck(this, Right);

    return _possibleConstructorReturn(this, _getPrototypeOf(Right).apply(this, arguments));
  }

  _createClass(Right, [{
    key: "map",
    value: function map(fn) {
      var value = this.valueOf();

      if (isLeft(value)) {
        return value;
      } else if (!fjl.isset(value)) {
        return Left.of("TypeError: Cannot operate on `".concat(value, "`."));
      }

      return Right.of(fn(value));
    }
  }], [{
    key: "of",
    value: function of(x) {
      return new Right(x);
    }
  }]);

  return Right;
}(Just);
var isRight = function isRight(x) {
  return x instanceof Right;
};
var isLeft = function isLeft(x) {
  return x instanceof Left;
};
var either = fjl.curry(function (leftCallback, rightCallback, monad) {
  var identity = alwaysMonad(monad).flatMap(fjl.id),
      out = isRight(monad) ? identity.flatMap(fjl.toFunction(rightCallback)) : Left.of(identity).flatMap(leftCallback);
  return fjl.isset(out) ? out.join() : out;
});
var toRight = function toRight(x) {
  return isRight(x) ? x : new Right(x);
};
var toLeft = function toLeft(x) {
  return isLeft(x) ? x : new Left(x);
};

/**
 * Makes all module members in library accessible via itself (is also the main export of the library).
 * Created by elydelacruz on 2/19/2017.
 * @module fjlDataCore
 */

/* ==================================== */

/* Virtual types */

/* ==================================== */

/**
 * @typedef {Function} UnaryOperation
 */

exports.Functor = Functor;
exports.Apply = Apply;
exports.Applicative = Applicative;
exports.Bifunctor = Bifunctor;
exports.IO = IO;
exports.Monad = Monad;
exports.isMonad = _isMonad;
exports.valueOf = valueOf;
exports.join = join;
exports.fmap = fmap;
exports.ap = ap;
exports.flatMap = flatMap;
exports.getMonadUnWrapper = getMonadUnWrapper;
exports.Just = Just;
exports.isJust = _isJust;
exports.isNothing = isNothing;
exports.Nothing = Nothing;
exports.just = just;
exports.nothing = nothing;
exports.maybe = maybe;
exports.unWrapJust = unWrapJust;
exports.unWrapMaybe = unWrapMaybe;
exports.maybeEqual = maybeEqual;
exports.isMaybe = isMaybe;
exports.toMaybe = toMaybe;
exports.Left = Left;
exports.Right = Right;
exports.isRight = isRight;
exports.isLeft = isLeft;
exports.either = either;
exports.toRight = toRight;
exports.toLeft = toLeft;

return exports;

}({},fjl));
//# sourceMappingURL=fjl-data-core.js.map
