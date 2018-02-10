/**
 * Created by edlc on 12/9/16.
 */
'use strict';
import Functor from './Functor';
import {subClass} from 'fjl';

let Extend = subClass (Functor,
    function Extend (value) {
        if (!(this instanceof  Extend)) {
            return new Extend(value);
        }
        Functor.call(this, value);
    }, {
        extend: function (fn) {
            return new Extend(fn(this));
        }
    });

export default Extend;
