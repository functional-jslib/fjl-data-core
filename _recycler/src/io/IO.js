/**
 * Created by elydelacruz on 2/19/2017.
 */
'use strict';

import Monad from '../monad/Monad';
import {compose, isFunction} from 'fjl';

const ensureFunction = value => !isFunction(value) ? (x => x) : value;

function IO (fn) {
    if (!this || !(this instanceof IO)) {
        return IO.of(fn);
    }
    Monad.call(this, fn);
}

IO.prototype.map = function (fn) {
    return IO.of(compose(fn, this.valueOf()));
};

IO.prototype.do = function (...args) {
    return this.valueOf()(...args);
};

IO.of = fn => new IO(ensureFunction(fn));
