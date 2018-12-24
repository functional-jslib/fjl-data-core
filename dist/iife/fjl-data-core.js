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
 * a functor creates one from given value to it.
 * @function module:functor.toFunctor
 * @param x {{map: Function}|*} - Functor or any.
 * @returns {*}
 */

/**
 * Plain old functor class.
 * @class module:functor.Functor
 * @param value {*}
 * @property value {*}
 */

var Functor =
/*#__PURE__*/
function () {
  /**
   * @constructor
   * @param value {*}
   */
  function Functor(value) {
    _classCallCheck(this, Functor);

    this.value = value;
  }
  /**
   * Extracts value of functor (same as monadic `join`).
   * @method module:functor.Functor#valueOf
   * @returns {*}
   */


  _createClass(Functor, [{
    key: "valueOf",
    value: function valueOf() {
      return this.value;
    }
    /**
     * Maps a function over contents of functor.
     * @method module:functor.Functor#map
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
     * @method module:functor.Functor#fmap
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
 * @property value {*}
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
     * @method module:functor.Apply#ap
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
     * @method module:functor.Applicative.of
     * @param value {*}
     * @returns {Applicative}
     * @static
     */
    value: function of(value) {
      return new Applicative(value);
    }
  }, {
    key: "liftA2",
    value: function liftA2(fn, appA, appB) {
      return appA.constructor.of(fn(appA.valueOf(), appB.valueOf));
    }
  }, {
    key: "apRight",
    value: function apRight(appA, appB) {
      return appB;
    }
  }, {
    key: "apLeft",
    value: function apLeft(appA, appB) {
      return appA;
    }
  }]);

  return Applicative;
}(Apply);

/**
 * Created by edlc on 12/9/16.
 * @memberOf module:functor
 */
/**
 * Bifunctor class;  Mostly useful for eithers and/or maybes.
 * @class module:functor.Bifunctor
 * @param value1 {*}
 * @param value2 {*}
 * @property value {*}
 * @property value2 {*}
 * @extends module:functor.Functor
 */

var Bifunctor =
/*#__PURE__*/
function (_Functor) {
  _inherits(Bifunctor, _Functor);

  /**
   * @param value1 {*}
   * @param value2 {*}
   * @private
   * @returns {Bifunctor}
   */
  function Bifunctor(value1, value2) {
    var _this;

    _classCallCheck(this, Bifunctor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Bifunctor).call(this, value1));
    _this.value2 = value2;
    return _this;
  }
  /**
   * Returns wrapped 'second' value.
   * @method module:functor.Bifunctor#value2Of
   * @returns {*}
   */


  _createClass(Bifunctor, [{
    key: "value2Of",
    value: function value2Of() {
      return this.value2;
    }
    /**
     * Allows you to map over first 'contained' value.
     * @method module:functor.Bifunctor#first
     * @param fn {Function} - Unary operation.
     * @returns {Bifunctor}
     */

  }, {
    key: "first",
    value: function first(fn) {
      return new this.constructor(fn(this.valueOf()), this.value2Of());
    }
    /**
     * Allows you to map over second 'contained' value.
     * @method module:functor.Bifunctor#second
     * @param fn {Function} - Unary operation.
     * @returns {Bifunctor}
     */

  }, {
    key: "second",
    value: function second(fn) {
      return new this.constructor(this.valueOf(), fn(this.value2Of()));
    }
    /**
     * Allows you to map 2 functions over contained values - One function over each value.
     * @method module:functor.Bifunctor#bimap
     * @param fn1 {Function} - Unary op.
     * @param fn2 {Function} - Unary op.
     * @returns {Bifunctor}
     */

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
var isMonad = function isMonad(value) {
  return value && value instanceof Monad;
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
var unWrapMonadByType = function unWrapMonadByType(Type, monad) {
  if (!fjl.isset(monad)) {
    return monad;
  }

  var _getMonadUnWrapper = getMonadUnWrapper(Type),
      _getMonadUnWrapper2 = _slicedToArray(_getMonadUnWrapper, 2),
      unWrapper = _getMonadUnWrapper2[0],
      tailCallName = _getMonadUnWrapper2[1],
      unwrap = fjl.trampoline(unWrapper, tailCallName);

  return unwrap(monad);
};
/**
 * @class module:monad.Monad
 * @param x {*}
 * @property value {*}
 * @extends module:functor.Applicative
 */

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
     * @returns {*}
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
      var out = unWrapMonadByType(this.constructor, fn(this.join()));
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
     * @param x {*}
     * @returns {Monad}
     */

  }], [{
    key: "of",
    value: function of(x) {
      return new Monad(x);
    }
  }]);

  return Monad;
}(Applicative);

/**
 * Created by elydelacruz on 2/19/2017.
 * Io module - Contains `IO` class.
 * Fore more on io class
 * @see http://learnyouahaskell.com/input-and-output
 * @module io
 */
/**
 * @class io.IO
 * @param fn {Function} - Operation to contain within `IO`
 * @property `value` {*} - `IO` however wraps non-function values to `function` on construction.
 * @extends module:monad.Monad
 */

var IO =
/*#__PURE__*/
function (_Monad) {
  _inherits(IO, _Monad);

  _createClass(IO, null, [{
    key: "unWrapIO",

    /**
     * Unwraps an `IO`.
     * @function module:io.IO.unWrapIO
     * @static
     * @param io {IO}
     * @returns {*}
     */
    value: function unWrapIO(io) {
      if (!IO.isIO(io)) {
        return io;
      }

      return unWrapMonadByType(IO, io);
    }
    /**
     * Applicative pure;  Same as `new IO(...)`.
     * @function module:io.IO.of
     * @static
     * @param fn {Function} - Unary operation.
     * @returns {IO}
     */

  }, {
    key: "of",
    value: function of(fn) {
      return new IO(fn);
    }
    /**
     * Checks for `IO`.
     * @function module:io.IO.isIO
     * @static
     * @param x {*}.
     * @returns {boolean}
     */

  }, {
    key: "isIO",
    value: function isIO(x) {
      return x instanceof IO;
    }
    /**
     * Performs io.
     * @function module:io.IO.isIO
     * @static
     * @param io {IO}.
     * @param args {...*} {IO}.
     * @returns {boolean}
     */

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
  /**
   * Maps incoming function onto contained, innermost, value
   * and returns a new `IO` which will containe the result of calling incoming function on originally contained value - A.k.a - flat-map operation.
   * @memberOf module:io.IO
   * @param fn {Function} - Unary operation.
   * @returns {IO}
   */


  _createClass(IO, [{
    key: "flatMap",
    value: function flatMap$$1(fn) {
      return fjl.compose(this.constructor.of, IO.unWrapIO, fn, IO.unWrapIO)(fjl.toFunction(this.join())());
    }
    /**
     * Maps incoming function on contained value and returns
     * a new `IO` container containing result of unary operation (incoming-function's result).
     * @memberOf module:io.IO
     * @param fn {Function}
     * @returns {IO}
     */

  }, {
    key: "map",
    value: function map(fn) {
      return fjl.compose(this.constructor.of, fn)(fjl.toFunction(this.valueOf())());
    }
  }]);

  return IO;
}(Monad);

var NothingSingleton;
/**
 * Constructor and function for creating/fetching `Nothing`.
 * @note Nothing always returns a singleton instance of `Nothing` (whether calling `Nothing` with new or as a
 * function.
 * @function module:maybe.Nothing
 * @param [x=undefined]{*} - Ignored.
 * @returns {Nothing}
 * @constructor
 * @memberOf module:maybe
 */

function Nothing() {
  if (NothingSingleton) {
    return NothingSingleton;
  } else if (!(this instanceof Nothing)) {
    return new Nothing();
  }

  NothingSingleton = this;
  Object.freeze(NothingSingleton);
} // Documented further below


var isNothing = function isNothing(x) {
  return x === NothingSingleton;
};
var nothing = function nothing() {
  return new Nothing();
};
var returnThis = function returnThis(x) {
  return this;
}; // Methods

/**
 * Returns `Nothing`.
 * @method module:maybe.Nothing#valueOf
 * @returns {Nothing}
 */


Nothing.prototype.valueOf = returnThis;
/**
 * Returns `Nothing`.
 * @method module:maybe.Nothing#join
 * @returns {Nothing}
 */

Nothing.prototype.join = returnThis;
/**
 * Returns `Nothing`.
 * @method module:maybe.Nothing#map
 * @returns {Nothing}
 */

Nothing.prototype.map = returnThis;
/**
 * Returns `Nothing`.
 * @method module:maybe.Nothing#ap
 * @returns {Nothing}
 */

Nothing.prototype.ap = returnThis;
/**
 * Returns `Nothing`.
 * @method module:maybe.Nothing#flatMap
 * @returns {Nothing}
 */

Nothing.prototype.flatMap = returnThis; // Set statics

/**
 * Applicative `pure` - Same as `new Nothing()`, `Nothing()`, and `nothing()`.
 * @memberOf module:maybe.Nothing
 * @function module:maybe.Nothing.of
 * @static
 * @returns {Nothing}
 */

Nothing.of = function (x) {
  return new Nothing();
}; // Object.freeze makes properties on object immutable
// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
// Saves us from having to do the following (great!):
// Object.defineProperties(Nothing, {
//     of: {value: () => new Nothing(), enumerable: true},
//     isNothing: {value: isNothing, enumerable: true}
// });


Object.freeze(Nothing);

/**
 * Contains `Just` constructor and associated methods.
 */
var isJust = function isJust(x) {
  return x instanceof Just;
};
var just = function just(x) {
  return new Just(x);
};
/**
 * @class maybe.Just
 * @param x {*}
 * @property value {*}
 * @extends module:monad.Monad
 */

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

    /**
     * Maps incoming function over contained value and
     * returns result wrapped in `Just`.
     * @method module:maybe.Just#map
     * @param fn {Function} - Unary operation.
     * @returns {Just|Nothing}
     */
    value: function map(fn) {
      var constructor = this.constructor,
          value = this.valueOf();
      return fjl.isset(value) && !isNothing(value) ? constructor.of(fn(value)) : constructor.counterConstructor.of(value);
    }
    /**
     * Applicative pure - Same as `new Just(...)`.
     * @method module:maybe.Just.of
     * @static
     * @param x {*}
     * @returns {Just}
     */

  }], [{
    key: "of",
    value: function of(x) {
      return just(x);
    }
  }]);

  return Just;
}(Monad);
Just.counterConstructor = Nothing;

/**
 * @module maybe
 */
var _getMonadUnWrapper = getMonadUnWrapper(Just);
var _getMonadUnWrapper2 = _slicedToArray(_getMonadUnWrapper, 2);
var justUnWrapper = _getMonadUnWrapper2[0];
var justUnWrapperTailCallName = _getMonadUnWrapper2[1];

var maybe = fjl.curry(function (replacement, fn, maybeInst) {
  var subject = fjl.isset(maybeInst) && isMaybe(maybeInst) ? maybeInst.map(fjl.id) : nothing();
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
  return isNothing(x) || isJust(x);
};
var toMaybe = function toMaybe(x) {
  if (!fjl.isset(x)) {
    return nothing();
  }

  return isMaybe(x) ? x : just(x);
};

/**
 * Contains `Either` constructs (`Right`, `Left`,  `either` etc.) and associated operations.
 * Created by elyde on 12/10/2016.
 * @module either
 */
/**
 * `Left` representation of `Either` construct.
 * @class module:either.Left
 * @param x {*}
 * @property value {*}
 * @extends module:monad.Monad
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

    /**
     * Same as `new Left(...)`.
     * @method module:either.Left.of
     * @static
     * @param x {*}
     * @returns {Left}
     */
    value: function of(x) {
      return new Left(x);
    }
  }]);

  return Left;
}(Monad);
/**
 * @class module:either.Right
 * @param x {*}
 * @property value {*}
 * @extends module:maybe.Just
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

    /**
     * Maps a function over contained value and returns result wrapped.
     * @method module:either.Right#map
     * @param fn {Function} - Unary operation.
     * @returns {Either}
     */
    value: function map(fn) {
      var value = this.valueOf();

      if (isLeft(value)) {
        return value;
      } else if (!fjl.isset(value)) {
        return Left.of("TypeError: Cannot operate on `".concat(value, "`."));
      }

      return Right.of(fn(value));
    }
    /**
     * Same as `new Right(...)`.
     * @method module:either.Right.of
     * @static
     * @param x {*}
     * @returns {Right}
     */

  }], [{
    key: "of",
    value: function of(x) {
      return new Right(x);
    }
  }]);

  return Right;
}(Just);
var left = function left(x) {
  return new Left(x);
};
var right = function right(x) {
  return new Right(x);
};
var isRight = function isRight(x) {
  return x instanceof Right;
};
var isLeft = function isLeft(x) {
  return x instanceof Left;
};
var toRight = function toRight(x) {
  return isRight(x) ? x : right(x);
};
var toLeft = function toLeft(x) {
  return isLeft(x) ? x : left(x);
};
var toEither = function toEither(x) {
  return isLeft(x) || isRight(x) ? x : right(x).map(fjl.id);
};
var either = fjl.curry(function (leftCallback, rightCallback, _either_) {
  var identity = toEither(_either_).flatMap(fjl.id),
      out = isRight(_either_) ? identity.flatMap(fjl.toFunction(rightCallback)) : identity.flatMap(leftCallback);
  return fjl.isset(out) ? out.join() : out;
});

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

/**
 * @typedef {Just|Nothing} Maybe
 */

/**
 * @typedef {Left|Right} Either
 */

exports.Functor = Functor;
exports.Apply = Apply;
exports.Applicative = Applicative;
exports.Bifunctor = Bifunctor;
exports.IO = IO;
exports.Monad = Monad;
exports.isMonad = isMonad;
exports.valueOf = valueOf;
exports.join = join;
exports.fmap = fmap;
exports.ap = ap;
exports.flatMap = flatMap;
exports.getMonadUnWrapper = getMonadUnWrapper;
exports.Just = Just;
exports.isJust = isJust;
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
exports.left = left;
exports.right = right;
exports.isRight = isRight;
exports.isLeft = isLeft;
exports.toRight = toRight;
exports.toLeft = toLeft;
exports.toEither = toEither;
exports.either = either;

return exports;

}({},fjl));
//# sourceMappingURL=fjl-data-core.js.map
