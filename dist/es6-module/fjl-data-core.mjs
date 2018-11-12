import { apply, compose, curry, id, instanceOf, isFunction, isset } from 'fjl';

/**
 * Created by edlc on 12/9/16.
 */
class Functor {
  constructor(value) {
    this.value = value;
  }

  valueOf() {
    return this.value;
  }

  map(fn) {
    return new this.constructor(fn(this.valueOf()));
  }

  fmap(fn) {
    return this.map(fn);
  }

}

const toFunction = x => isFunction(x) ? x : () => x;
const alwaysFunctor = x => !x.map ? new Functor(x) : x;

/**
 * Created by edlc on 12/9/16.
 */
class Apply extends Functor {
  ap(x) {
    return x.map(toFunction(this.valueOf()));
  }

}

/**
 * Created by edlc on 12/9/16.
 */
class Applicative extends Apply {
  static of(value) {
    return new Applicative(value);
  }

}

/**
 * Created by edlc on 12/9/16.
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
 * Basic `Monad` class.  Used to extend from to create `Maybe` and `Either` module/classes.
 * @module Monad
 * @see `Maybe` reference: http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Maybe.html
 * @see `Either` reference: http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Either.html
 */
const isMonad = value => value instanceof Monad;
const valueOf = x => x.valueOf();
const join = x => x.join();
const fmap = curry((fn, x) => x.map(fn));
const ap = curry((applicative, functor) => applicative.ap(functor));
const flatMap = curry((fn, monad) => monad.flatMap(fn));
const getMonadUnWrapper = Type => {
  const isTypeToUnWrap = instanceOf(Type);
  return function unWrapMonadByType(monad) {
    return isTypeToUnWrap(monad) ? function trampolineCall() {
      return unWrapMonadByType(monad.valueOf());
    } : monad;
  };
};
const trampoline = fn => {
  return (...args) => {
    let result = apply(fn, args);

    while (isset(result) && result.name === 'trampolineCall' && isFunction(result)) {
      result = result();
    }

    return result;
  };
};
class Monad extends Applicative {
  static unWrapMonadByType(Type, monad) {
    if (!isset(monad)) {
      return monad;
    }

    const unwrap = trampoline(getMonadUnWrapper(Type));
    return unwrap(monad);
  }

  join() {
    return Monad.unWrapMonadByType(this.constructor, this);
  }

  flatMap(fn) {
    const out = Monad.unWrapMonadByType(this.constructor, fn(this.join()));
    return this.constructor.of(out);
  }

  chain(fn) {
    return this.flatMap(fn);
  }

  static of(x) {
    return new Monad(x);
  }

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
    super(toFunction(fn)); // Enforce `value` field validation
    // defineEnumProps([[Function, 'value', this.value]], this);
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

const maybe = curry((replacement, fn, maybeInst) => {
  const subject = isset(maybeInst) && isMaybe(maybeInst) ? maybeInst.map(id) : Nothing.of();
  return isNothing(subject) ? replacement : subject.map(fn).join();
});
const isMaybe = x => isNothing(x) || isJust(x);
const toMaybe = x => isset(x) ? just(x) : nothing();

/**
 * Created by elyde on 12/10/2016.
 */
class Left extends Monad {
  static of(x) {
    return new Left(x);
  }

}
class Right extends Just {
  map(fn) {
    const value = this.valueOf();

    if (isLeft(value)) {
      return value;
    } else if (!isset(value)) {
      return Left.of(`TypeError: Cannot operate on \`null\` and/or \`undefined\`.  ` + `Value given \`${value}\`.`);
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
  const identity = alwaysFunctor(monad).map(id);

  switch (identity.constructor) {
    case Left:
      return identity.map(toFunction(leftCallback)).join();

    case Right:
      return identity.map(toFunction(rightCallback)).join();

    default:
      return Left.of(monad).map(leftCallback).join();
  }
});

/**
 * Created by elydelacruz on 2/19/2017.
 * @module fjlDataCore
 * Core monad types (useful for javascript).
 */

export { Functor, Apply, Applicative, Bifunctor, IO, Monad, isMonad, valueOf, join, fmap, ap, flatMap, getMonadUnWrapper, trampoline, Just, isJust, isNothing, Nothing, just, nothing, maybe, isMaybe, toMaybe, Left, Right, isRight, isLeft, either, toFunction, alwaysFunctor };
//# sourceMappingURL=fjl-data-core.mjs.map
