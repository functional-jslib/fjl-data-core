/**
 * Created by elyde on 12/10/2016.
 * @module fjlMaybe
 */

import {compose, isset, curry, isType, map, id} from 'fjl';

import Identity from './Identity';

const _protected = {
    NothingSingleton: null,
    NothingSingletonCreated: null
};

export const

    isJust = x => x instanceof Just,

    isNothing = x => x === _protected.NothingSingleton;

export class Nothing {
    static of() {
        return new Nothing();
    }

    constructor() {
        let {NothingSingleton, NothingSingletonCreated} = _protected;
        if (NothingSingleton) {
            return NothingSingleton;
        }
        else if (!NothingSingletonCreated) {
            _protected.NothingSingletonCreated = true;
            _protected.NothingSingleton = this;
            Object.freeze(_protected);
        }
        if (!this.hasOwnProperty('value')) {
            Object.defineProperty(this, 'value', {
                value: null
            });
        }
    }

    valueOf () {
        return this.value;
    }

    map() {
        return this;
    }

    join() {
        return this;
    }

    ap() {
        return this;
    }

    flatMap() {
        return this;
    }
}

export class Just extends Identity {
    static of(value) {
        return new Just(value);
    }

    static counterConstructor = Nothing;

    map(fn) {
        const {constructor} = this,
            value = this.valueOf();
        return isset(value) ? constructor.of(fn(value)) :
            constructor.counterConstructor.of(value);
    }
}

export const maybe = curry((replacement, fn, monad) => {
    const subject = monad.map(id);
    return isNothing(subject) ? replacement : subject.flatMap(fn).valueOf();
});

class Maybe extends Identity {
    constructor (value) {
        super(Just.of(value));
    }

    map(fn) {
        const value = this.valueOf();
        return isJust(value) ? value.map(fn) : Nothing.of();
    }

    ap (functor) {
        return compose(Maybe.of, ap(__, functor), map(id))(this.valueOf());
    }

    flatMap(fn) {
        return compose(Maybe.of, flatMap(fn), map(id))(this.valueOf());
    }

    of (value) {
        return new Maybe(value);
    }
}

export default Maybe;
