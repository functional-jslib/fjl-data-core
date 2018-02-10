import Nothing from './Nothing';
import Monad from '../monad/Monad';
import {isset} from 'fjl-is';

export const isJust = x => x instanceof Just;

export function Just (x) {
    Monad.call(this, x);
}
Just.counterConstructor = Nothing;
Just.isJust = isJust;

Object.assign(Just.prototype, Monad.prototype);

Just.prototype.map = function (fn) {
    const {constructor} = this,
        value = this.valueOf();
    return isset(value) ? constructor.of(fn(value)) :
        constructor.counterConstructor.of(value);
};

Object.freeze(Just);

export default Just;
