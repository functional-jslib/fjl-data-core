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

export default Functor;
