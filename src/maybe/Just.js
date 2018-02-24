import Nothing, {isNothing} from './Nothing';
import Monad from '../monad/Monad';
import {isset} from 'fjl';

export const isJust = x => x instanceof Just;
export function Just (x) {
    if (!isJust(this)) {
        return new Just(x);
    }
    Object.defineProperty(this, 'value', {value: x});
}

Just.of = x => new Just(x);
Just.isJust = isJust;
Just.counterConstructor = Nothing;
Object.assign(Just.prototype, Monad.prototype);

Just.prototype.map = function (fn) {
    const {constructor} = this,
        value = this.valueOf();
    return isset(value) && !isNothing(value) ? constructor.of(fn(value)) :
        constructor.counterConstructor.of(value);
};

Object.freeze(Just);
export default Just;
