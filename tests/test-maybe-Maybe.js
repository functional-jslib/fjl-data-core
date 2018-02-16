import {expect, assert} from 'chai';
import Maybe, {isMaybe, Nothing, Just, maybe} from '../src/maybe/Maybe';
import {all, map, concat} from 'fjl';
import {log} from './utils';

describe ('Maybe', () => {
    describe ('Constructor', () => {
        // @todo should we include `NaN` as a value that gives you a `Nothing` (probably but for simplicities sake (for now)...)
        test ('Should return a `Nothing` when receiving `null` or `undefined`', () => {
            [null, undefined].forEach(value => {
                const result = Maybe(value);
                expect(result).to.be.instanceOf(Nothing);
                result.map(x => expect(x).to.equal(undefined));
            });
        });
        test ('Should return a `Just` when receiving anything other than `null` or `undefined`', () => {
            [false, 0, () => ({}), [], {}].forEach(value => {
                const result = Maybe(value);
                expect(result).to.be.instanceOf(Just);
                result.map(x => expect(x).to.equal(value));
            });
        });
    });
    describe ('`isMaybe`', () => {
        test ('should return `true` when a value is of type `Maybe`', () => {
            concat([99, undefined].map(x => [Maybe(x), new Maybe(x), Maybe.of(x)]))
                .forEach(x => {
                    // log (x);
                    expect(isMaybe(x)).to.equal(true);
                });
        });
        test ('should return `false` when a value is not a `Maybe`', () => {
            [false, 0, () => ({}), [], {}].forEach(x => {
                expect(isMaybe(x)).to.equal(false);
            });
        });
    });
    describe ('`maybe`', () => {
        test ('should return `Maybe`\'s contained value', () => {
            const caseValue = 99,
                op = x => x * 2,
                insteadValue = 27,

            /**
             * [[replacementValue, operation], expectedValue, monadInstance]
             * @type {Array.<Array.<*, Function>, *, (Maybe|*)>}
             */
            cases = [
                [[insteadValue, op], op(caseValue), Maybe(caseValue)],
                [[insteadValue, op], insteadValue, Maybe(undefined)],
                [[insteadValue, op], insteadValue, Maybe(null)],
                [[insteadValue, op], insteadValue, caseValue],
            ];
            cases.forEach(([args, expectedValue, monad]) => {
                const [replacement, operation] = args;
                expect(maybe(replacement, operation, monad))
                    .to.equal(expectedValue);
            });
        });

    });
});
