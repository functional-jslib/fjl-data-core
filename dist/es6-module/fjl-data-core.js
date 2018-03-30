import { curry, id, isFunction, isset } from 'fjl';

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
    fmap (fn) {
        return this.map(fn);
    }
}

const toFunction = x => isFunction(x) ? x : () => x;
const alwaysFunctor = x => !x.map ? new Functor(x) : x;

/**
 * Created by edlc on 12/9/16.
 */

class Apply extends Functor {
    ap (x) {
        return x.map(toFunction(this.valueOf()));
    }
}

/**
 * Created by edlc on 12/9/16.
 */
class Applicative extends Apply {
    static of (value) {
        return new Applicative(value);
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

class Monad extends Applicative {
    join () {
        return this.valueOf();
    }
    flatMap (fn) {
        const out = fn(this.join());
        return !(out instanceof this.constructor) ?
            this.constructor.of(out) : out;
    }
    chain (fn) {
        return this.flatMap(fn);
    }
    static of (x) { return new Monad(x); }
    static isMonad (x) { return isMonad(x); }
}

let NothingSingleton;

function Nothing () {
    if (NothingSingleton) {
        return NothingSingleton;
    }
    else if (!(this instanceof Nothing)) {
        return new Nothing();
    }
    NothingSingleton = this;
    Object.freeze(NothingSingleton);
}

const isNothing = x => x === NothingSingleton;
const returnThis = function () { return this; };
const {prototype} = Nothing;

// Methods
prototype.valueOf   = returnThis;
prototype.join      = returnThis;
prototype.map       = returnThis;
prototype.ap        = returnThis;
prototype.flatMap   = returnThis;

// Set statics
Nothing.of  = () => new Nothing();
Nothing.isNothing = isNothing;

// Object.freeze makes properties on object immutable
// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
// Saves us from having to do the following (great!):
// Object.defineProperties(Nothing, {
//     of: {value: () => new Nothing(), enumerable: true},
//     isNothing: {value: isNothing, enumerable: true}
// });
Object.freeze(Nothing);

const isJust = x => x instanceof Just;

class Just extends Monad {
    map (fn) {
        const {constructor} = this,
            value = this.valueOf();
        return isset(value) && !isNothing(value) ? constructor.of(fn(value)) :
            constructor.counterConstructor.of(value);
    }
    static of (x) { return new Just(x); }
    static isJust (x) { return isJust(x); }
}

Just.counterConstructor = Nothing;

const maybe = curry((replacement, fn, maybeInst) => {
        const subject = isset(maybeInst) && isMaybe(maybeInst) ? maybeInst.map(id) : Nothing.of();
        return isNothing(subject) ? replacement : subject.map(fn).join();
    });
const isMaybe = x => isNothing(x) || isJust(x);

/**
 * Created by elyde on 12/10/2016.
 */

class Left extends Monad {
    static of (x) { return new Left(x); }
}

class Right extends Just {
    map (fn) {
        const value = this.valueOf();
        if (isLeft(value)) {
            return value;
        }
        else if (!isset(value)) {
            return Left.of(
                `TypeError: Cannot operate on \`null\` and/or \`undefined\`.  ` +
                `Value given \`${value}\`.`
            );
        }
        return Right.of(fn(value));
    }

    static of (x) { return new Right(x); }
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
 */

/**
 * Created by elydelacruz on 2/19/2017.
 * @module fjlDataCore
 * Core monad types (useful for javascript).
 */

export { isMonad, valueOf, join, fmap, ap, flatMap, Just, isJust, isNothing, Nothing, maybe, isMaybe, isRight, isLeft, either, Left, Right };
//# sourceMappingURL=fjl-data-core.js.map
