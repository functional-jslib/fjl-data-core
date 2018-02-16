import {Monad} from '../monad/Monad';

export function Left (value) {
    if (!(this instanceof Left)) {
        return new Left(value);
    }
}

Object.assign(Left.prototype, Monad.prototype);
