/**
 * Created by edlc on 12/9/16.
 */
'use strict';
import Apply from './Apply';
import {subClass} from 'fjl';

let Applicative = subClass (Apply,
    function Applicative(value) {
        if (!(this instanceof Applicative)) {
            return Applicative.of(value);
        }
        Apply.call(this, value);
    },
    null,
    {
        of: function (value) {
            return new Applicative(value);
        }
    });

export default Applicative;
