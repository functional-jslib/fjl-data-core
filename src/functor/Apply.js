/**
 * Created by edlc on 12/9/16.
 */

import {toFunction} from '../utils';
import Functor from './Functor';

export default class Apply extends Functor {
    ap (x) {
        return x.map(toFunction(this.valueOf()));
    }
}
