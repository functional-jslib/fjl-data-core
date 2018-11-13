import { compose, curry, id, instanceOf, isset, toFunction, trampoline } from 'fjl';

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

class Functor {
  /**
   * @memberOf module:functor.Functor
   * @param value {any}
   */
  constructor(value) {
    this.value = value;
  }
  /**
   * Extracts value of functor (same as monadic `join`).
   * @memberOf module:functor.Functor
   * @returns {any}
   */


  valueOf() {
    return this.value;
  }
  /**
   * Maps a function over contents of functor.
   * @memberOf module:functor.Functor
   * @param fn {Function} - Function that takes one `any` and returns one `any`.
   * @returns {Functor}
   */


  map(fn) {
    return new this.constructor(fn(this.valueOf()));
  }
  /**
   * Same as `#Functor.map`.
   * @memberOf module:functor.Functor
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
 * @property value {any}
 * @extends module:functor.Functor
 */

class Apply extends Functor {
  /**
   * Applicative apply operation - applies contained function over passed in functor.
   * @memberOf module:functor.Apply
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
   * @function module:functor.Applicative.of
   * @static
   * @param value {any}
   * @returns {Applicative}
   */
  static of(value) {
    return new Applicative(value);
  }

}

/**
 * Created by edlc on 12/9/16.
 * @memberOf module:functor
 */
class Bifunctor extends Functor {
  constructor(value1, value2) {
    super(value1);
    this.value2 = value2;
  }

  value2Of() {
    return this.value2;
  }

  first(fn) {
    return new this.constructor(fn(this.valueOf()), this.value2Of());
  }

  second(fn) {
    return new this.constructor(this.valueOf(), fn(this.value2Of()));
  }

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
const alwaysMonad = x => !x.map ? new Monad(x) : x;
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
/**
 * @class module:monad.Monad
 * @param x {any}
 * @property value {any}
 */

class Monad extends Applicative {
  static unWrapMonadByType(Type, monad) {
    if (!isset(monad)) {
      return monad;
    }

    const [unWrapper, tailCallName] = getMonadUnWrapper(Type),
          unwrap = trampoline(unWrapper, tailCallName);
    return unwrap(monad);
  }
  /**
   * Monadic join - Removes one layer of monadic structure from value.
   * @memberOf module:monad.Monad
   * @returns {any}
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
    const out = Monad.unWrapMonadByType(this.constructor, fn(this.join()));
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
   * @param x {any}
   * @returns {Monad}
   */


  static of(x) {
    return new Monad(x);
  }
  /**
   * Checks for monad.
   * @memberOf module:monad.Monad
   * @static
   * @param x {any}
   * @returns {boolean}
   */


  static isMonad(x) {
    return isMonad(x);
  }

}

/**
 * Created by elydelacruz on 2/19/2017.
 */
class IO extends Monad {
  static unWrapIO(io) {
    if (!IO.isIO(io)) {
      return io;
    }

    return Monad.unWrapMonadByType(IO, io);
  }

  static of(fn) {
    return new IO(fn);
  }

  static isIO(x) {
    return x instanceof IO;
  }

  static do(io, ...args) {
    const instance = !IO.isIO(io) ? new IO(io) : io;
    return compose(IO.of, IO.unWrapIO)(toFunction(instance.join())(...args));
  }

  constructor(fn) {
    super(toFunction(fn));
  }

  flatMap(fn) {
    return compose(this.constructor.of, IO.unWrapIO, fn, IO.unWrapIO)(toFunction(this.join())());
  }

  map(fn) {
    return compose(this.constructor.of, fn)(toFunction(this.valueOf())());
  }

}

let NothingSingleton;

function Nothing() {
  if (NothingSingleton) {
    return NothingSingleton;
  } else if (!(this instanceof Nothing)) {
    return new Nothing();
  }

  NothingSingleton = this;
  Object.freeze(NothingSingleton);
}

const isNothing = x => x === NothingSingleton;
const nothing = () => new Nothing();
const returnThis = function () {
  return this;
};
const {
  prototype
} = Nothing; // Methods


prototype.valueOf = returnThis;
prototype.join = returnThis;
prototype.map = returnThis;
prototype.ap = returnThis;
prototype.flatMap = returnThis; // Set statics

Nothing.of = () => new Nothing();

Nothing.isNothing = isNothing;
Nothing.nothing = nothing; // Object.freeze makes properties on object immutable
// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
// Saves us from having to do the following (great!):
// Object.defineProperties(Nothing, {
//     of: {value: () => new Nothing(), enumerable: true},
//     isNothing: {value: isNothing, enumerable: true}
// });

Object.freeze(Nothing);

const isJust = x => x instanceof Just;
const just = x => new Just(x);
class Just extends Monad {
  map(fn) {
    const {
      constructor
    } = this,
          value = this.valueOf();
    return isset(value) && !isNothing(value) ? constructor.of(fn(value)) : constructor.counterConstructor.of(value);
  }

  static of(x) {
    return just(x);
  }

  static isJust(x) {
    return isJust(x);
  }

}
Just.counterConstructor = Nothing;

const [justUnWrapper, justUnWrapperTailCallName] = getMonadUnWrapper(Just);
const maybe = curry((replacement, fn, maybeInst) => {
  const subject = isset(maybeInst) && isMaybe(maybeInst) ? maybeInst.map(id) : Nothing.of();
  return isNothing(subject) ? replacement : subject.map(fn).join();
});
const unWrapJust = trampoline(justUnWrapper, justUnWrapperTailCallName);
const unWrapMaybe = x => isNothing(x) ? nothing() : unWrapJust(x);
const maybeEqual = curry((a, b) => unWrapMaybe(a) === unWrapMaybe(b));
const isMaybe = x => isNothing(x) || isJust(x);
const toMaybe = x => isset(x) ? just(x) : nothing();

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

class Left extends Monad {
  static of(x) {
    return new Left(x);
  }

}
/**
 * @class Right
 * @param x {any}
 * @property value {any}
 */

class Right extends Just {
  map(fn) {
    const value = this.valueOf();

    if (isLeft(value)) {
      return value;
    } else if (!isset(value)) {
      return Left.of(`TypeError: Cannot operate on \`${value}\`.`);
    }

    return Right.of(fn(value));
  }

  static of(x) {
    return new Right(x);
  }

}
const isRight = x => x instanceof Right;
const isLeft = x => x instanceof Left;
const either = curry((leftCallback, rightCallback, monad) => {
  const identity = alwaysMonad(monad).flatMap(id),
        out = isRight(monad) ? identity.flatMap(toFunction(rightCallback)) : Left.of(identity).flatMap(leftCallback);
  return isset(out) ? out.join() : out;
});
const toRight = x => isRight(x) ? x : new Right(x);
const toLeft = x => isLeft(x) ? x : new Left(x);

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

export { Functor, Apply, Applicative, Bifunctor, IO, Monad, isMonad, valueOf, join, fmap, ap, flatMap, getMonadUnWrapper, Just, isJust, isNothing, Nothing, just, nothing, maybe, unWrapJust, unWrapMaybe, maybeEqual, isMaybe, toMaybe, Left, Right, isRight, isLeft, either, toRight, toLeft };
//# sourceMappingURL=fjl-data-core.js.map
