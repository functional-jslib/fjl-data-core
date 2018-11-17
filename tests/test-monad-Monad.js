import Monad, {toMonad} from '../src/monad/Monad';
import {minimum, maximum} from 'fjl';
import {zeroToNine} from './fixtures/defaultData';

describe('monad', () => {

    describe('Monad', () => {
        it('should be constructable', () => {
            expect(new Monad(99)).toBeInstanceOf(Monad);
        });

        describe('Functor', () => {

        });
        describe('Applicative', () => {
            describe('pure', () => {
                it('should lift a given value into it\'s contained function', () => {
                    const mZeroToNine = toMonad(zeroToNine);
                    [
                        [toMonad(maximum), mZeroToNine, toMonad(9)],
                        [toMonad(minimum), mZeroToNine, toMonad(0)]
                    ]
                        .forEach(([app, m1, m2]) => {
                            app.ap(m1).map(x => {
                                expect(x).toEqual(m2.valueOf());
                            });
                        });
                });
            });
        });
    });

});
