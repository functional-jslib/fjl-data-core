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

export default class Monad extends Applicative {
    join () {
        const out = this.valueOf();
        return !(out instanceof this.constructor) ?
            this.constructor.of(out) : out;
    }
    flatMap (fn) {
        return this.map(fn).join();
    }
    static of (x) { return new Monad(x); }
    static isMonad (x) { return isMonad(x); }
}
