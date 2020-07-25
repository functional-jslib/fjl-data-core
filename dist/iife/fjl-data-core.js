var fjlDataCore = (function (exports, fjl) {
  'use strict';

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

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
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

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
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

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  /**
   * Plain old functor class.
   * @class module:functor.Functor
   * @param value {*}
   * @property value {*}
   */

  var Functor = /*#__PURE__*/function () {
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
   * Apply construct.
   * @class module:functor.Apply
   * @param fn {Function|*}
   * @property value {*}
   * @extends module:functor.Functor
   */

  var Apply = /*#__PURE__*/function (_Functor) {
    _inherits(Apply, _Functor);

    var _super = _createSuper(Apply);

    function Apply() {
      _classCallCheck(this, Apply);

      return _super.apply(this, arguments);
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
   * @class module:functor.Applicative
   * @extends module:functor.Apply
   */

  var Applicative = /*#__PURE__*/function (_Apply) {
    _inherits(Applicative, _Apply);

    var _super = _createSuper(Applicative);

    function Applicative() {
      _classCallCheck(this, Applicative);

      return _super.apply(this, arguments);
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
   * Bifunctor class;  Mostly useful for eithers and/or maybes.
   * @class module:functor.Bifunctor
   * @param value1 {*}
   * @param value2 {*}
   * @property value {*}
   * @property value2 {*}
   * @extends module:functor.Functor
   */

  var Bifunctor = /*#__PURE__*/function (_Functor) {
    _inherits(Bifunctor, _Functor);

    var _super = _createSuper(Bifunctor);

    /**
     * @param value1 {*}
     * @param value2 {*}
     * @private
     * @returns {Bifunctor}
     */
    function Bifunctor(value1, value2) {
      var _this;

      _classCallCheck(this, Bifunctor);

      _this = _super.call(this, value1);
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

  var 
  /**
   * Returns boolean indicating whether given value is an
   * instance of monad or not.
   * @function module:monad.isMonad
   * @param value {*}
   * @returns {boolean}
   */
  isMonad = function isMonad(value) {
    return value && value instanceof Monad;
  },

  /**
   * Calls `valueOf` on value (use for functional composition).
   * @function module:monad.valueOf
   * @param x {*}
   * @returns {*}
   */
  valueOf = function valueOf(x) {
    return x.valueOf();
  },

  /**
   * Calls `valueOf` on given value.  Same as
   * monadic `join` operation (extracts inner value of
   * container/object).
   * @function module:monad.join
   * @param x {*}
   * @returns {*}
   */
  join = valueOf,

  /**
   * Maps given function over given functor.
   * @function module:monad.fmap
   * @param fn {Function}
   * @param x {Functor}
   * @returns {Functor}
   */
  fmap = fjl.curry(function (fn, x) {
    return x.map(fn);
  }),

  /**
   * Applies function contained by applicative to contents of given functor.
   * (Same as functional applicative `apply`).
   * @function module:monad.ap
   * @param applicative {Applicative}
   * @param functor {Functor}
   * @returns {Applicative}
   */
  ap = fjl.curry(function (applicative, functor) {
    return applicative.ap(functor);
  }),

  /**
   * Flat maps a function over given monad's contained value.
   * @function module:monad.flatMap
   * @param fn {Function}
   * @param monad {Monad}
   * @returns {Monad}
   */
  flatMap = fjl.curry(function (fn, monad) {
    return monad.flatMap(fn);
  }),

  /**
   * A recursive monad un-wrapper - Returns monad's unwrapped, inner-mostly, contained value (recursively).
   * @function module:monad.getMonadUnWrapper
   * @param Type {Function}
   * @returns {Array.<*>} - [unWrapFunction, tailCallFuncName (used by `trampoline` @see module:fjl.trampoline)]
   */
  getMonadUnWrapper = function getMonadUnWrapper(Type) {
    return [function unWrapMonadByType(monad) {
      return fjl.instanceOf(Type, monad) ? function trampolineCall() {
        return unWrapMonadByType(monad.valueOf());
      } : monad;
    }, 'trampolineCall'];
  },

  /**
   * Unwraps monad by type.
   * @function module:monad.unWrapMonadByType
   * @param Type {Function}
   * @param monad {Monad}
   * @returns {*}
   */
  unWrapMonadByType = function unWrapMonadByType(Type, monad) {
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

  var Monad = /*#__PURE__*/function (_Applicative) {
    _inherits(Monad, _Applicative);

    var _super = _createSuper(Monad);

    function Monad() {
      _classCallCheck(this, Monad);

      return _super.apply(this, arguments);
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
   * @class io.IO
   * @param fn {Function} - Operation to contain within `IO`
   * @property `value` {*} - `IO` however wraps non-function values to `function` on construction.
   * @extends module:monad.Monad
   */

  var IO = /*#__PURE__*/function (_Monad) {
    _inherits(IO, _Monad);

    var _super = _createSuper(IO);

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

      return _super.call(this, fjl.toFunction(fn));
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
      value: function flatMap(fn) {
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


  var 
  /**
   * Checks for `Nothing`.
   * @function module:maybe.isNothing
   * @param x {*}
   * @returns {boolean}
   */
  isNothing = function isNothing(x) {
    return x === NothingSingleton;
  },

  /**
   * Returns `Nothing`.
   * @function module:maybe.nothing
   * @returns {Nothing}
   */
  nothing = function nothing() {
    return new Nothing();
  },
      returnThis = function returnThis(x) {
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

  var 
  /**
   * Checks for `Just`.
   * @function module:maybe.isJust
   * @param x {*}
   * @returns {boolean}
   */
  isJust = function isJust(x) {
    return x instanceof Just;
  },

  /**
   * Functional constructor (function that returns an instance) for `Just` -
   * Same as `new Just(...)` (just shorter and can be used as a function).
   * @function module:maybe.just
   * @param x {Just|*}
   * @returns {Just}
   */
  just = function just(x) {
    return new Just(x);
  };
  /**
   * @class maybe.Just
   * @param x {*}
   * @property value {*}
   * @extends module:monad.Monad
   */

  var Just = /*#__PURE__*/function (_Monad) {
    _inherits(Just, _Monad);

    var _super = _createSuper(Just);

    function Just() {
      _classCallCheck(this, Just);

      return _super.apply(this, arguments);
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

  var _getMonadUnWrapper = getMonadUnWrapper(Just),
      _getMonadUnWrapper2 = _slicedToArray(_getMonadUnWrapper, 2),
      justUnWrapper = _getMonadUnWrapper2[0],
      justUnWrapperTailCallName = _getMonadUnWrapper2[1];

  var 
  /**
   * The maybe function takes a `replacement` value, a function (unary operation), and a Maybe value. If the Maybe value is `Nothing`, the function returns the `replacement` value. Otherwise, it applies the function to the value contained  by the `Just` and returns the result.
   * @function module:maybe.maybe
   * @param replacement {*}
   * @param fn {Function} - Unary operation.
   * @param maybeInst {(Nothing|Just|*)} - Maybe instance or non-maybe value.
   * @returns {*}
   */
  maybe = fjl.curry(function (replacement, fn, maybeInst) {
    var subject = fjl.isset(maybeInst) && isMaybe(maybeInst) ? maybeInst.map(fjl.id) : nothing();
    return isNothing(subject) ? replacement : subject.map(fn).join();
  }),

  /**
   * Unwraps just (recursively).
   * @function module:maybe.unWrapJust
   * @param x {*} - Expected `Just`.
   * @returns {*}
   */
  unWrapJust = fjl.trampoline(justUnWrapper, justUnWrapperTailCallName),

  /**
   * Unwraps maybe (recursively).
   * @function module:maybe.unWrapMaybe
   * @param x {*} - Expected `Maybe`.
   * @returns {*}
   */
  unWrapMaybe = function unWrapMaybe(x) {
    return isNothing(x) ? nothing() : unWrapJust(x);
  },

  /**
   * Equality operator for maybes.
   * @function module:maybe.maybeEqual
   * @param a {*} - Maybe 1.
   * @param b {*} - Maybe 2.
   * @returns {boolean}
   */
  maybeEqual = fjl.curry(function (a, b) {
    return unWrapMaybe(a) === unWrapMaybe(b);
  }),

  /**
   * Checks for maybe.
   * @function module:maybe.isMaybe
   *  @param x {*}.
   * @returns {boolean}
   */
  isMaybe = function isMaybe(x) {
    return isNothing(x) || isJust(x);
  },

  /**
   * Creates maybe from value.
   * @function module:maybe.toMaybe
   * @param x {*}
   * @returns {Maybe} - `Just` or `Nothing` based on value.
   */
  toMaybe = function toMaybe(x) {
    if (!fjl.isset(x)) {
      return nothing();
    }

    return isMaybe(x) ? x : just(x);
  };

  /**
   * `Left` representation of `Either` construct.
   * @class module:either.Left
   * @param x {*}
   * @property value {*}
   * @extends module:monad.Monad
   */

  var Left = /*#__PURE__*/function (_Monad) {
    _inherits(Left, _Monad);

    var _super = _createSuper(Left);

    function Left() {
      _classCallCheck(this, Left);

      return _super.apply(this, arguments);
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

  var Right = /*#__PURE__*/function (_Just) {
    _inherits(Right, _Just);

    var _super2 = _createSuper(Right);

    function Right() {
      _classCallCheck(this, Right);

      return _super2.apply(this, arguments);
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
  var 
  /**
   * Returns a new `Left`
   * @function module:either.left
   * @param x {*}
   * @returns {Left}
   */
  left = function left(x) {
    return new Left(x);
  },

  /**
   * Returns a `Right`.
   * @function module:either.right
   * @param x {*}
   * @returns {Right}
   */
  right = function right(x) {
    return new Right(x);
  },

  /**
   * Checks for instance of `Right` constructor.
   * @function module:either.isRight
   * @param x {*}
   * @returns {boolean}
   */
  isRight = function isRight(x) {
    return x instanceof Right;
  },

  /**
   * Checks for instance of `Left` constructor.
   * @function module:either.isLeft
   * @param x {*}
   * @returns {boolean}
   */
  isLeft = function isLeft(x) {
    return x instanceof Left;
  },

  /**
   * Returns a `Right` - if not a `Right` creates one from given, else returns given.
   * @function module:either.toRight
   * @param x {*}
   * @returns {Right}
   */
  toRight = function toRight(x) {
    return isRight(x) ? x : right(x);
  },

  /**
   * Returns a `Left` - if not a `Left` creates one from given, else returns given.
   * @function module:either.toLeft
   * @param x {*}
   * @returns {Left}
   */
  toLeft = function toLeft(x) {
    return isLeft(x) ? x : left(x);
  },

  /**
   * Converts given to an either (`Right`|`Left`)
   * @function module:either.toEither
   * @param x {*}
   * @returns {Left|Right}
   */
  toEither = function toEither(x) {
    return isLeft(x) || isRight(x) ? x : right(x).map(fjl.id);
  },

  /**
   * Calls matching callback on incoming `Either`'s type;  If is a `Left`
   * (after mapping identity func on it) then calls left-callback and unwraps result
   * else calls right-callback and does the same.  Think of it like a functional
   * ternary statement (lol).
   * @function module:either.either
   * @param leftCallback {Function} - Mapped over value of `monad`'s identity.
   * @param rightCallback {Function} - "".
   * @param _either_ {Either|*}
   * @return {*} - Value of unwrapped resulting value of `flatMap`ped, passed-in callback's on passed in monad.
   * @example
   * expect(
       either(() => 404, () => 200, compose(right, right, right, right)(true))
     ).toEqual(undefined);
   */
  either = fjl.curry(function (leftCallback, rightCallback, _either_) {
    var identity = toEither(_either_).flatMap(fjl.id),
        out = isRight(_either_) ? identity.flatMap(fjl.toFunction(rightCallback)) : identity.flatMap(leftCallback);
    return fjl.isset(out) ? out.join() : out;
  });

  exports.Applicative = Applicative;
  exports.Apply = Apply;
  exports.Bifunctor = Bifunctor;
  exports.Functor = Functor;
  exports.IO = IO;
  exports.Just = Just;
  exports.Left = Left;
  exports.Monad = Monad;
  exports.Nothing = Nothing;
  exports.Right = Right;
  exports.ap = ap;
  exports.either = either;
  exports.flatMap = flatMap;
  exports.fmap = fmap;
  exports.getMonadUnWrapper = getMonadUnWrapper;
  exports.isJust = isJust;
  exports.isLeft = isLeft;
  exports.isMaybe = isMaybe;
  exports.isMonad = isMonad;
  exports.isNothing = isNothing;
  exports.isRight = isRight;
  exports.join = join;
  exports.just = just;
  exports.left = left;
  exports.maybe = maybe;
  exports.maybeEqual = maybeEqual;
  exports.nothing = nothing;
  exports.right = right;
  exports.toEither = toEither;
  exports.toLeft = toLeft;
  exports.toMaybe = toMaybe;
  exports.toRight = toRight;
  exports.unWrapJust = unWrapJust;
  exports.unWrapMaybe = unWrapMaybe;
  exports.valueOf = valueOf;

  return exports;

}({}, fjl));
//# sourceMappingURL=fjl-data-core.js.map
