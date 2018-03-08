/**
 * Created by elydelacruz on 2/19/2017.
 */

'use strict';

import Monad from '../monad/Monad';
import {toFunction} from '../utils';

export default class Io extends Monad {
    constructor(fn) {
        super(toFunction(fn));
    }

    static of(fn) {
        return new Io(fn);
    }

    static isIo (x) {
        return x instanceof Io;
    }

    do (...args) {
        return Io.of(this.join()(...args));
    }

    unsafePerformIo (...args) {
        return this.do(...args);
    }
}
