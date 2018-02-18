/**
 * Created by edlc on 12/9/16.
 * Basic `Monad` class.  Used to extend from to create `Maybe` and `Either` module/classes.
 * @module Monad
 * @see `Maybe` reference: http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Maybe.html
 * @see `Either` reference: http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Either.html
 */

import {isFunction, curry} from 'fjl';
import Applicative from '../functor/Applicative';

export {map, join} from 'fjl';

export const
    
    isMonad = value => value instanceof Monad,

    valueOf = x => x.valueOf(),

    ap = curry((applicative, functor) => applicative.ap(functor)),

    flatMap = curry((fn, monad) => monad.flatMap(fn));

export function Monad (value) {
    if (!(this instanceof Monad)) {
        return new Monad(value);
    }
    Applicative.call(this, value);
}

const {prototype} = Monad;

Object.assign(prototype, Applicative.prototype);

prototype.join = function () {
    const out = this.valueOf();
    return !(out instanceof this.constructor) ?
        this.constructor.of(out) : out;
};

prototype.flatMap = function (fn) {
    return this.map(fn).join();
};

// Applicative `of` (same as Applicative `pure :: a -> f a` (lifts value to/into type))
Monad.of  = (x) => new Monad(x);

// Type check
Monad.isMonad = isMonad;

// Make statics and prototype unchangeable
Object.freeze(Monad);

export default Monad;
