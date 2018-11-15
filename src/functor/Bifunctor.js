/**
 * Created by edlc on 12/9/16.
 * @memberOf module:functor
 */
import Functor from './Functor';

/**
 * Bifunctor class;  Mostly useful for eithers and/or maybes.
 * @class module:functor.Bifunctor
 */
export default class Bifunctor extends Functor {
    constructor(value1, value2) {
        super(value1);
        this.value2 = value2;
    }

    /**
     * Returns wrapped 'second' value.
     * @memberOf module:functor.Bifunctor
     * @returns {any}
     */
    value2Of() {
        return this.value2;
    }

    /**
     * Allows you to map over first 'contained' value.
     * @memberOf module:functor.Bifunctor
     * @param fn {Function} - Unary operation.
     * @returns {Bifunctor}
     */
    first (fn) {
        return new this.constructor(fn(this.valueOf()), this.value2Of());
    }

    /**
     * Allows you to map over second 'contained' value.
     * @memberOf module:functor.Bifunctor
     * @param fn {Function} - Unary operation.
     * @returns {Bifunctor}
     */
    second (fn) {
        return new this.constructor(this.valueOf(), fn(this.value2Of()));
    }

    /**
     * Allows you to map 2 functions over contained values - One function over each value.
     * @memberOf module:functor.Bifunctor
     * @param fn1 {Function} - Unary op.
     * @param fn2 {Function} - Unary op.
     * @returns {Bifunctor}
     */
    bimap (fn1, fn2) {
        return new this.constructor(
            fn1(this.valueOf()),
            fn2(this.value2Of())
        );
    }
}
