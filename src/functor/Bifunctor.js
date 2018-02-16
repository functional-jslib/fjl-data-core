/**
 * Created by edlc on 12/9/16.
 */
import Functor from './Functor';

function Bifunctor (value1, value2) {
    if (!(this instanceof Bifunctor)) {
        return new Bifunctor(value1, value2);
    }
    Functor.call(this, value1);
    this.value2 = value2;
}

Bifunctor.prototype.value2Of = function () {
    return this.value2;
};

Bifunctor.prototype.first = function (fn) {
    return new this.constructor(fn(this.valueOf()), this.value2Of());
};

Bifunctor.prototype.second = function (fn) {
    return new this.constructor(this.valueOf(), fn(this.value2Of()));
};

Bifunctor.prototype.bimap = function (fn1, fn2) {
    return new this.constructor(
        fn1(this.valueOf()),
        fn2(this.value2Of())
    );
};

Object.assign(Bifunctor.prototype, Functor.prototype);

export default Bifunctor;
