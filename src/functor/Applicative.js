/**
 * Created by edlc on 12/9/16.
 */
import Apply from './Apply';

function Applicative(value) {
    if (!(this instanceof Applicative)) {
        return new Applicative(value);
    }
    Apply.call(this, value);
}

Applicative.of = function (value) {
    return new Applicative(value);
};

Object.assign(Applicative.prototype, Apply.prototype);

Object.freeze(Applicative);

export default Applicative;
