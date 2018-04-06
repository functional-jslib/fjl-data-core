/**
 * Created by edlc on 12/9/16.
 * Basic `Monad` class.  Used to extend from to create `Maybe` and `Either` module/classes.
 * @module Monad
 * @see `Maybe` reference: http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Maybe.html
 * @see `Either` reference: http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Either.html
 */

import {apply, isset, curry, isFunction, instanceOf} from 'fjl';
import Applicative from '../functor/Applicative';

export const
    isMonad = value => value instanceof Monad,
    valueOf = x => x.valueOf(),
    join = x => x.join(),
    fmap = curry((fn, x) => x.map(fn)),
    ap = curry((applicative, functor) => applicative.ap(functor)),
    flatMap = curry((fn, monad) => monad.flatMap(fn));

const

    getMonadUnWrapper = Type => {
        const isTypeToUnWrap = instanceOf(Type);
        return function unWrapMonadByType (monad) {
            return isTypeToUnWrap(monad) ? function trampolineCall () {
                return unWrapMonadByType(monad.valueOf());
            } : monad;
        };
    },

    trampoline = fn => {
        return (...args) => {
            let result = apply(fn, args);
            while (isset(result) &&
                result.name === 'trampolineCall' &&
                isFunction(result)
            ) {
                result = result();
            }
            return result;
        };
    };

export default class Monad extends Applicative {
    static unWrapMonadByType (Type, monad) {
        if (!isset(monad)) { return monad; }
        const unwrap = trampoline(getMonadUnWrapper(Type));
        return unwrap(monad);
    }
    map (fn) {
        return this.constructor.of()
    }
    join () {
        return Monad.unWrapMonadByType(this.constructor, this);
    }
    flatMap (fn) {
        const out = Monad.unWrapMonadByType(this.constructor, fn(this.join()));
        return this.constructor.of(out);
    }
    chain (fn) {
        return this.flatMap(fn);
    }
    static of (x) { return new Monad(x); }
    static isMonad (x) { return isMonad(x); }
}
