import {expect, assert} from 'chai';
import Just from '../src/maybe/Just';
import {all, map} from 'fjl';

describe ('data.maybe.Just', () => {

    test ('Should be constructable (called with `new`)', () => {
        expect(new Just()).to.be.instanceOf(Just);
    });

    test ('Should return an instance when called as a function (called-as-a-function)', () => {
        expect(Just() instanceof Just).to.equal(true);
    });

    test ('Should capture passed in value when called as a constructor (with `new`)', () => {
        expect(new Just(99).valueOf()).to.equal(99);
    });

    test ('Should capture passed in value when called as a function', () => {
        expect(Just(99).valueOf()).to.equal(99);
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
        const just = Just();
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
            [Just(99), new Just(99), Just.of(99)].forEach(x => {
                expect(x.valueOf()).to.equal(99);
            });
            [Just(), new Just(), Just.of()].forEach(x => {
                expect(x.valueOf()).to.equal(undefined);
            });
        });
    });

    describe ('#`map`', () => {
        test ('should return an instance of `Just` after map operation', () => {
            const control = 99,
                op = x => x * 2,
                justResult = Just(control).map(op);
            expect(justResult instanceof Just).to.equal(true);
            map(
                x => expect(x).to.equal(op(control)),
                justResult
            );
        });
        test ('should throw an error when receiving anything other than a function as it\'s parameter', () => {
            assert.throws(() => Just(99).map(), Error);
            assert.throws(() => Just(99).map(null), Error);
            assert.throws(() => Just(99).map(99), Error);
        });
    });

    describe ('#`flatMap`', () => {
        test ('should return an instance of `Just` after `flatMap` operation', () => {
            const control = 99,
                op = x => x * 2,
                justResult = Just(control).flatMap(op);
            expect(justResult instanceof Just).to.equal(true);
            map(
                x => expect(x).to.equal(op(control)),
                justResult
            );
        });
        test ('should throw an error when receiving anything other than a function as it\'s parameter', () => {
            assert.throws(() => Just(99).flatMap(), Error);
            assert.throws(() => Just(99).flatMap(null), Error);
            assert.throws(() => Just(99).flatMap(99), Error);
        });
    });


});
