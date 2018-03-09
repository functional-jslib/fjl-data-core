/**
 * Created by edlc on 12/9/16.
 * Basic `Monad` class.  Used to extend from to create `Maybe` and `Either` module/classes.
 * @module Monad
 * @see `Maybe` reference: http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Maybe.html
 * @see `Either` reference: http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Either.html
 */

import {curry} from 'fjl';
import Applicative from '../functor/Applicative';

export const
    isMonad = value => value instanceof Monad,
    valueOf = x => x.valueOf(),
    join = x => x.join(),
    fmap = curry((fn, x) => x.map(fn)),
    ap = curry((applicative, functor) => applicative.ap(functor)),
    flatMap = curry((fn, monad) => monad.flatMap(fn));

export default class Monad extends Applicative {
    join () {
        return this.valueOf();
    }
    flatMap (fn) {
        const out = fn(this.join());
        return !(out instanceof this.constructor) ?
            this.constructor.of(out) : out;
    }
    static of (x) { return new Monad(x); }
    static isMonad (x) { return isMonad(x); }
}
