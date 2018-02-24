/**
 * Created by edlc on 12/9/16.
 */
import Functor from './Functor';

export default class Bifunctor extends Functor {
    constructor(value1, value2) {
        super(value1);
        this.value2 = value2;
    }

    value2Of() {
        return this.value2;
    }

    first (fn) {
        return new this.constructor(fn(this.valueOf()), this.value2Of());
    }

    second (fn) {
        return new this.constructor(this.valueOf(), fn(this.value2Of()));
    }

    bimap (fn1, fn2) {
        return new this.constructor(
            fn1(this.valueOf()),
            fn2(this.value2Of())
        );
    }
}
