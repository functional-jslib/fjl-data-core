/**
 * Created by edlc on 12/9/16.
 * Basic `Monad` class.  Used to extend from to create `Maybe` and `Either` module/classes.
 * @module Monad
 * @see `Maybe` reference: http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Maybe.html
 * @see `Either` reference: http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Either.html
 */
export const isMonad = value => value instanceof Monad;

export function Monad (value) {
    if (!this || !(this instanceof Monad)) {
        return new Monad(value);
    }
    Object.defineProperty(this, 'value', {value: value});
}

const {prototype} = Monad;

prototype.valueOf = function () {
    return this.value;
};

prototype.join = function () {
    return this.valueOf();
};

prototype.map = function (fn) {
    return this.constructor.of(fn(this.valueOf()));
};

prototype.ap = function (x) {
    return x.map(this.valueOf());
};

prototype.flatMap = function (fn) {
    return this.map(fn).join();
};

// Set statics
Monad.of  = (x) => new Monad(x);
Monad.isMonad = isMonad;

Object.freeze(Monad);

export default Monad;
