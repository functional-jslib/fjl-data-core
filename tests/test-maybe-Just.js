import {expect, assert} from 'chai';
import Just, {isJust} from '../src/maybe/Just';
import {all, map} from 'fjl';

describe ('data.maybe.Just', () => {

    describe ('`isJust`', () => {
        test ('should return `true` when a value is of type `Just`', () => {
            [new Just(), Just.of()].forEach(x => {
                expect(isJust(x)).to.equal(true);
            });
        });
        test ('should return `false` when a value is not a `Just`', () => {
            [false, 0, () => ({}), [], {}].forEach(x => {
                expect(isJust(x)).to.equal(false);
            });
        });
    });

    test ('Should be constructable (called with `new`)', () => {
        expect(new Just()).to.be.instanceOf(Just);
    });

    test ('Should capture passed in value when called as a constructor (with `new`)', () => {
        expect(new Just(99).valueOf()).to.equal(99);
    });

    test ('Should capture passed in value when called via static `of` method', () => {
        expect(Just.of(99).valueOf()).to.equal(99);
    });

    test ('Expect it to be extendable via es6 `class` syntax', () => {
        class Hello extends Just {
            constructor (something) {
                super(something);
            }
        }
        expect(new Hello() instanceof Just).to.equal(true);
    });

    const methodNames = ['ap', 'map', 'flatMap', 'join'];

    test ('Expect `map`, `ap`, `flatMap`, and `join` methods to exist on instance', () => {
        const just = Just.of();
        expect(
            all(methodName =>
                    (just[methodName] instanceof Function),
                methodNames
            )
        )
            .to.equal(true);
    });

    describe ('`Just.of`', () => {
        test ('should be a static method', () => {
            expect(Just.of instanceof Function).to.equal(true);
        });
        test ('should return an instance when called', () => {
            expect(Just.of() instanceof Just).to.equal(true);
        });
        test ('should return an instance with passed in value captured in returned instance', () => {
            expect((Just.of(99)).valueOf()).to.equal(99);
        });
    });

    describe ('#`valueOf`', () => {
        test ('should return contained value of container (`undefined` or whatever was passed ' +
            'on construction of container)', () => {
            [new Just(99), Just.of(99)].forEach(x => {
                expect(x.valueOf()).to.equal(99);
            });
            [new Just(), Just.of()].forEach(x => {
                expect(x.valueOf()).to.equal(undefined);
            });
        });
    });

    describe ('#`join`', () => {
        test ('should always return a `Just` with one level monadic structure removed from contained value', () => {
            Just.of(99).join().map(x => expect(x).to.equal(99));
            Just.of(Just.of(99)).join().map(x => expect(x).to.equal(99));

            // Thirdly nested 'just' should be `x`
            Just.of(Just.of(Just.of(99)))
                .join()             // Remove one layer of structure
                .map(x =>           // Map over last contained `just`
                    x.map(y => expect(y).to.equal(99))
                );
            const emptyJust = Just.of().join();
            expect(emptyJust).to.be.instanceOf(Just);
            emptyJust.map(x => expect(x).to.equal(undefined));
        });

    });

    describe ('#`map`', () => {
        test ('should return an instance of `Just` after map operation', () => {
            const control = 99,
                op = x => x * 2,
                justResult = Just.of(control).map(op);
            expect(justResult instanceof Just).to.equal(true);
            map(
                x => expect(x).to.equal(op(control)),
                justResult
            );
        });
        test ('should throw an error when receiving anything other than a function as it\'s parameter', () => {
            assert.throws(() => Just.of(99).map(), Error);
            assert.throws(() => Just.of(99).map(null), Error);
            assert.throws(() => Just.of(99).map(99), Error);
        });
    });

    describe ('#`flatMap`', () => {
        test ('should return an instance of `Just` after `flatMap` operation', () => {
            const control = 99,
                op = x => x * 2,
                justResult = Just.of(control).flatMap(op);
            expect(justResult instanceof Just).to.equal(true);
            map(
                x => expect(x).to.equal(op(control)),
                justResult
            );
        });
        test ('should throw an error when receiving anything other than a function as it\'s parameter', () => {
            assert.throws(() => Just.of(99).flatMap(), Error);
            assert.throws(() => Just.of(99).flatMap(null), Error);
            assert.throws(() => Just.of(99).flatMap(99), Error);
        });
    });

    describe ('#`ap`', () => {
        test ('should map contained value over passed in functor', () => {
            const op = x => x * 2;
            Just.of(op)
                .ap(Just.of(2))
                .map(x => expect(x).to.equal(op(2)));
        });
        test ('should be able to map contained value over functor even if it is not a ' +
            'function (call should internally wrap non-function values in functions', () => {
            Just.of()
                .ap(Just.of(99))
                .map(x => expect(x).to.equal(undefined));
        });
    });

});
