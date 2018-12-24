import { compose, curry, id, instanceOf, isset, toFunction, trampoline } from 'fjl';

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

class Functor {
  /**
   * @constructor
   * @param value {*}
   */
  constructor(value) {
    this.value = value;
  }
  /**
   * Extracts value of functor (same as monadic `join`).
   * @method module:functor.Functor#valueOf
   * @returns {*}
   */


  valueOf() {
    return this.value;
  }
  /**
   * Maps a function over contents of functor.
   * @method module:functor.Functor#map
   * @param fn {Function} - Function that takes one `any` and returns one `any`.
   * @returns {Functor}
   */


  map(fn) {
    return new this.constructor(fn(this.valueOf()));
  }
  /**
   * Same as `#Functor.map`.
   * @method module:functor.Functor#fmap
   * @param fn {Function}
   * @returns {Functor}
   */


  fmap(fn) {
    return this.map(fn);
  }

}

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

class Apply extends Functor {
  /**
   * Applicative apply operation - applies contained function over passed in functor.
   * @method module:functor.Apply#ap
   * @param x {Functor}
   * @returns {Apply}
   */
  ap(x) {
    return x.map(toFunction(this.valueOf()));
  }

}

/**
 * Created by edlc on 12/9/16.
 * Applicative class module.
 * @memberOf module:functor
 */
/**
 * @class module:functor.Applicative
 * @extends module:functor.Apply
 */

class Applicative extends Apply {
  /**
   * Constructs an applicative with given `value`.
   * @method module:functor.Applicative.of
   * @param value {*}
   * @returns {Applicative}
   * @static
   */
  static of(value) {
    return new Applicative(value);
  }

  static liftA2(fn, appA, appB) {
    return appA.constructor.of(fn(appA.valueOf(), appB.valueOf));
  }

  static apRight(appA, appB) {
    return appB;
  }

  static apLeft(appA, appB) {
    return appA;
  }

}

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

class Bifunctor extends Functor {
  /**
   * @param value1 {*}
   * @param value2 {*}
   * @private
   * @returns {Bifunctor}
   */
  constructor(value1, value2) {
    super(value1);
    this.value2 = value2;
  }
  /**
   * Returns wrapped 'second' value.
   * @method module:functor.Bifunctor#value2Of
   * @returns {*}
   */


  value2Of() {
    return this.value2;
  }
  /**
   * Allows you to map over first 'contained' value.
   * @method module:functor.Bifunctor#first
   * @param fn {Function} - Unary operation.
   * @returns {Bifunctor}
   */


  first(fn) {
    return new this.constructor(fn(this.valueOf()), this.value2Of());
  }
  /**
   * Allows you to map over second 'contained' value.
   * @method module:functor.Bifunctor#second
   * @param fn {Function} - Unary operation.
   * @returns {Bifunctor}
   */


  second(fn) {
    return new this.constructor(this.valueOf(), fn(this.value2Of()));
  }
  /**
   * Allows you to map 2 functions over contained values - One function over each value.
   * @method module:functor.Bifunctor#bimap
   * @param fn1 {Function} - Unary op.
   * @param fn2 {Function} - Unary op.
   * @returns {Bifunctor}
   */


  bimap(fn1, fn2) {
    return new this.constructor(fn1(this.valueOf()), fn2(this.value2Of()));
  }

}

/**
 * Created by edlc on 12/9/16.
 * Contains basic `Monad` class and associated methods.
 * For 'what is a monad'/back-story
 * @see `Maybe` reference: [http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Maybe.html](http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Maybe.html)
 * @see `Either` reference: [http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Either.html](http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Either.html)
 * @module monad
 */
const isMonad = value => value && value instanceof Monad;
const valueOf = x => x.valueOf();
const join = valueOf;
const fmap = curry((fn, x) => x.map(fn));
const ap = curry((applicative, functor) => applicative.ap(functor));
const flatMap = curry((fn, monad) => monad.flatMap(fn));
const getMonadUnWrapper = Type => {
  return [function unWrapMonadByType(monad) {
    return instanceOf(Type, monad) ? function trampolineCall() {
      return unWrapMonadByType(monad.valueOf());
    } : monad;
  }, 'trampolineCall'];
};
const unWrapMonadByType = (Type, monad) => {
  if (!isset(monad)) {
    return monad;
  }

  const [unWrapper, tailCallName] = getMonadUnWrapper(Type),
        unwrap = trampoline(unWrapper, tailCallName);
  return unwrap(monad);
};
/**
 * @class module:monad.Monad
 * @param x {*}
 * @property value {*}
 * @extends module:functor.Applicative
 */

class Monad extends Applicative {
  /**
   * Monadic join - Removes one layer of monadic structure from value.
   * @memberOf module:monad.Monad
   * @returns {*}
   */
  join() {
    return this.valueOf();
  }
  /**
   * Flat map operation.
   * @memberOf module:monad.Monad
   * @param fn {Function}
   * @returns {Monad}
   */


  flatMap(fn) {
    const out = unWrapMonadByType(this.constructor, fn(this.join()));
    return this.constructor.of(out);
  }
  /**
   * Same as `Monad.flatMap`.
   * @memberOf module:monad.Monad
   * @param fn {Function}
   * @returns {Monad}
   */


  chain(fn) {
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


  static of(x) {
    return new Monad(x);
  }

}

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

class IO extends Monad {
  /**
   * Unwraps an `IO`.
   * @function module:io.IO.unWrapIO
   * @static
   * @param io {IO}
   * @returns {*}
   */
  static unWrapIO(io) {
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


  static of(fn) {
    return new IO(fn);
  }
  /**
   * Checks for `IO`.
   * @function module:io.IO.isIO
   * @static
   * @param x {*}.
   * @returns {boolean}
   */


  static isIO(x) {
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


  static do(io, ...args) {
    const instance = !IO.isIO(io) ? new IO(io) : io;
    return compose(IO.of, IO.unWrapIO)(toFunction(instance.join())(...args));
  }

  constructor(fn) {
    super(toFunction(fn));
  }
  /**
   * Maps incoming function onto contained, innermost, value
   * and returns a new `IO` which will containe the result of calling incoming function on originally contained value - A.k.a - flat-map operation.
   * @memberOf module:io.IO
   * @param fn {Function} - Unary operation.
   * @returns {IO}
   */


  flatMap(fn) {
    return compose(this.constructor.of, IO.unWrapIO, fn, IO.unWrapIO)(toFunction(this.join())());
  }
  /**
   * Maps incoming function on contained value and returns
   * a new `IO` container containing result of unary operation (incoming-function's result).
   * @memberOf module:io.IO
   * @param fn {Function}
   * @returns {IO}
   */


  map(fn) {
    return compose(this.constructor.of, fn)(toFunction(this.valueOf())());
  }

}

let NothingSingleton;
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

function Nothing(x = undefined) {
  if (NothingSingleton) {
    return NothingSingleton;
  } else if (!(this instanceof Nothing)) {
    return new Nothing();
  }

  NothingSingleton = this;
  Object.freeze(NothingSingleton);
} // Documented further below


const isNothing = x => x === NothingSingleton;
const nothing = () => new Nothing();
const returnThis = function (x) {
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

Nothing.of = x => new Nothing(); // Object.freeze makes properties on object immutable
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
const isJust = x => x instanceof Just;
const just = x => new Just(x);
/**
 * @class maybe.Just
 * @param x {*}
 * @property value {*}
 * @extends module:monad.Monad
 */

class Just extends Monad {
  /**
   * Maps incoming function over contained value and
   * returns result wrapped in `Just`.
   * @method module:maybe.Just#map
   * @param fn {Function} - Unary operation.
   * @returns {Just|Nothing}
   */
  map(fn) {
    const {
      constructor
    } = this,
          value = this.valueOf();
    return isset(value) && !isNothing(value) ? constructor.of(fn(value)) : constructor.counterConstructor.of(value);
  }
  /**
   * Applicative pure - Same as `new Just(...)`.
   * @method module:maybe.Just.of
   * @static
   * @param x {*}
   * @returns {Just}
   */


  static of(x) {
    return just(x);
  }

}
/**
 * @static
 * @member {Functor} module:maybe.Just.counterConstructor
 */

Just.counterConstructor = Nothing;

/**
 * @module maybe
 */
const [justUnWrapper, justUnWrapperTailCallName] = getMonadUnWrapper(Just);
const maybe = curry((replacement, fn, maybeInst) => {
  const subject = isset(maybeInst) && isMaybe(maybeInst) ? maybeInst.map(id) : nothing();
  return isNothing(subject) ? replacement : subject.map(fn).join();
});
const unWrapJust = trampoline(justUnWrapper, justUnWrapperTailCallName);
const unWrapMaybe = x => isNothing(x) ? nothing() : unWrapJust(x);
const maybeEqual = curry((a, b) => unWrapMaybe(a) === unWrapMaybe(b));
const isMaybe = x => isNothing(x) || isJust(x);
const toMaybe = x => {
  if (!isset(x)) {
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

class Left extends Monad {
  /**
   * Same as `new Left(...)`.
   * @method module:either.Left.of
   * @static
   * @param x {*}
   * @returns {Left}
   */
  static of(x) {
    return new Left(x);
  }

}
/**
 * @class module:either.Right
 * @param x {*}
 * @property value {*}
 * @extends module:maybe.Just
 */

class Right extends Just {
  /**
   * Maps a function over contained value and returns result wrapped.
   * @method module:either.Right#map
   * @param fn {Function} - Unary operation.
   * @returns {Either}
   */
  map(fn) {
    const value = this.valueOf();

    if (isLeft(value)) {
      return value;
    } else if (!isset(value)) {
      return Left.of(`TypeError: Cannot operate on \`${value}\`.`);
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


  static of(x) {
    return new Right(x);
  }

}
const left = x => new Left(x);
const right = x => new Right(x);
const isRight = x => x instanceof Right;
const isLeft = x => x instanceof Left;
const toRight = x => isRight(x) ? x : right(x);
const toLeft = x => isLeft(x) ? x : left(x);
const toEither = x => isLeft(x) || isRight(x) ? x : right(x).map(id);
const either = curry((leftCallback, rightCallback, _either_) => {
  const identity = toEither(_either_).flatMap(id),
        out = isRight(_either_) ? identity.flatMap(toFunction(rightCallback)) : identity.flatMap(leftCallback);
  return isset(out) ? out.join() : out;
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

export { Functor, Apply, Applicative, Bifunctor, IO, Monad, isMonad, valueOf, join, fmap, ap, flatMap, getMonadUnWrapper, Just, isJust, isNothing, Nothing, just, nothing, maybe, unWrapJust, unWrapMaybe, maybeEqual, isMaybe, toMaybe, Left, Right, left, right, isRight, isLeft, toRight, toLeft, toEither, either };
//# sourceMappingURL=fjl-data-core.js.map
