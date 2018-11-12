import {isMaybe, Nothing, Just, maybe, toMaybe} from '../src/maybe/Maybe';
import {concat} from 'fjl';

describe ('Maybe', () => {
    describe ('Constructor', () => {
        // @todo should we include `NaN` as a value that gives you a `Nothing` (probably but for simplicities sake (for now)...)
        test ('Should return a `Nothing` when receiving `null` or `undefined`', () => {
            [null, undefined].forEach(value => {
                const result = toMaybe(value);
                expect(result).toBeInstanceOf(Nothing);
                result.map(x => expect(x).toEqual(undefined));
            });
        });
        test ('Should return a `Just` when receiving anything other than `null` or `undefined`', () => {
            [false, 0, () => ({}), [], {}].forEach(value => {
                const result = toMaybe(value);
                expect(result).toBeInstanceOf(Just);
                result.map(x => expect(x).toEqual(value));
            });
        });
    });
    describe ('`isMaybe`', () => {
        test ('should return `true` when a value is of type `toMaybe`', () => {
            concat([99, undefined].map(x => [toMaybe(x)]))
                .forEach(x => {
                    // log (x);
                    expect(isMaybe(x)).toEqual(true);
                });
        });
        test ('should return `false` when a value is not a `Maybe`', () => {
            [false, 0, () => ({}), [], {}].forEach(x => {
                expect(isMaybe(x)).toEqual(false);
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
                [[insteadValue, op], op(caseValue), toMaybe(caseValue)],
                [[insteadValue, op], insteadValue, toMaybe(undefined)],
                [[insteadValue, op], insteadValue, toMaybe(null)],
                [[insteadValue, op], insteadValue, caseValue],
            ];
            cases.forEach(([args, expectedValue, monad]) => {
                const [replacement, operation] = args;
                expect(maybe(replacement, operation, monad))
                    .toEqual(expectedValue);
            });
        });

    });
});
