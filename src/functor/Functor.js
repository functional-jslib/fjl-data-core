/**
 * Created by edlc on 12/9/16.
 */

function Functor(value) {
    if (!(this instanceof Functor)) {
        return new Functor(value);
    }
    this.value = value;
}

Functor.prototype.valueOf = function () {
    return this.value;
};

Functor.prototype.map = function (fn) {
    return new this.constructor(fn(this.valueOf()));
};

Functor.prototype.inject = function (x) {
    return this.map(_ => x);
};

Object.freeze(Functor);

export default Functor;
