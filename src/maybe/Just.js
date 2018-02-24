import Nothing, {isNothing} from './Nothing';
import Monad from '../monad/Monad';
import {isset} from 'fjl';

export const isJust = x => x instanceof Just;

class Just extends Monad {
    map (fn) {
        const {constructor} = this,
            value = this.valueOf();
        return isset(value) && !isNothing(value) ? constructor.of(fn(value)) :
            constructor.counterConstructor.of(value);
    }
    static of (x) { return new Just(x); }
    static isJust (x) { return isJust(x); }
}

Just.counterConstructor = Nothing;

export default Just;
