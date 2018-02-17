/**
 * Created by edlc on 12/9/16.
 */

'use strict';

import Functor from './Functor';

function Apply (value) {
    if (!(this instanceof Apply)) {
        return new Apply(value);
    }
    Functor.call(this, value);
}

Apply.prototype.ap = function (x) {
    return x.map(this.value);
};

Object.assign(Apply.prototype, Functor.prototype);

Object.freeze(Apply);

export default Apply;
