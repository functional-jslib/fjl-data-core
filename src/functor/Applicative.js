/**
 * Created by edlc on 12/9/16.
 */
import Apply from './Apply';

export default class Applicative extends Apply {
    static of (value) {
        return new Applicative(value);
    }
}
