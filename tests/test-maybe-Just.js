import Just, {isJust, just} from '../src/maybe/Just';
import {join} from '../src/monad/Monad';
import {all, map} from 'fjl';

describe ('data.maybe.Just', () => {

    describe ('`isJust`', () => {
        test ('should return `true` when a value is of type `Just`', () => {
            [new Just(), Just.of()].forEach(x => {
                expect(isJust(x)).toEqual(true);
            });
        });
        test ('should return `false` when a value is not a `Just`', () => {
            [false, 0, () => ({}), [], {}].forEach(x => {
                expect(isJust(x)).toEqual(false);
            });
        });
    });

    test ('Should be constructable (called with `new`)', () => {
        expect(new Just()).toBeInstanceOf(Just);
    });

    test ('Should capture passed in value when called as a constructor (with `new`)', () => {
        expect(new Just(99).valueOf()).toEqual(99);
    });

    test ('Should capture passed in value when called via static `of` method', () => {
        expect(Just.of(99).valueOf()).toEqual(99);
    });

    test ('Expect it to be extendable via es6 `class` syntax', () => {
        class Hello extends Just {
            constructor (something) {
                super(something);
            }
        }
        expect(new Hello() instanceof Just).toEqual(true);
    });

    const methodNames = ['ap', 'map', 'flatMap', 'join'];

    test ('Expect `map`, `ap`, `flatMap`, and `join` methods to exist on instance', () => {
        const j = Just.of();
        expect(
            all(methodName =>
                    (j[methodName] instanceof Function),
                methodNames
            )
        )
            .toEqual(true);
    });

    describe ('`Just.of`', () => {
        test ('should be a static method', () => {
            expect(Just.of instanceof Function).toEqual(true);
        });
        test ('should return an instance when called', () => {
            expect(Just.of() instanceof Just).toEqual(true);
        });
        test ('should return an instance with passed in value captured in returned instance', () => {
            expect((Just.of(99)).valueOf()).toEqual(99);
        });
    });

    describe ('#`valueOf`', () => {
        test ('should return contained value of container (`undefined` or whatever was passed ' +
            'on construction of container)', () => {
            [new Just(99), Just.of(99)].forEach(x => {
                expect(x.valueOf()).toEqual(99);
            });
            [new Just(), Just.of()].forEach(x => {
                expect(x.valueOf()).toEqual(undefined);
            });
            console.log(new Just(new Just(99)));
        });
    });

    describe ('#`join`', () => {
        test ('should remove one layer of monadic structure from container', () => {
            [
                [just(), undefined],
                [just(null), null],
                [just(false), false],
                [just(''), ''],
                [just(99), 99],
                [just(just(99)), just(99)],
                [just(just(just(99))), just(just(99))],
            ]
                .forEach(([arg, expected]) => {
                    expect(join(arg)).toEqual(expected); // does deep equality check here
                });
        });
    });

    describe ('#`map`', () => {
        test ('should return an instance of `Just` after map operation', () => {
            const control = 99,
                op = x => x * 2,
                justResult = Just.of(control).map(op);
            expect(justResult instanceof Just).toEqual(true);
            map(
                x => expect(x).toEqual(op(control)),
                justResult
            );
        });
        test ('should throw an error when receiving anything other than a function as it\'s parameter', () => {
            expect(() => Just.of(99).map()).toThrow(Error);
            expect(() => Just.of(99).map(null)).toThrow(Error);
            expect(() => Just.of(99).map(99)).toThrow(Error);
        });
    });

    describe ('#`flatMap`', () => {
        test ('should return an instance of `Just` after `flatMap` operation', () => {
            const control = 99,
                op = x => x * 2,
                justResult = Just.of(control).flatMap(op);
            expect(justResult instanceof Just).toEqual(true);
            map(
                x => expect(x).toEqual(op(control)),
                justResult
            );
        });
        test ('should throw an error when receiving anything other than a function as it\'s parameter', () => {
            expect(() => Just.of(99).flatMap()).toThrow(Error);
            expect(() => Just.of(99).flatMap(null)).toThrow(Error);
            expect(() => Just.of(99).flatMap(99)).toThrow(Error);
        });
    });

    describe ('#`ap`', () => {
        test ('should map contained value over passed in functor', () => {
            const op = x => x * 2;
            Just.of(op)
                .ap(Just.of(2))
                .map(x => expect(x).toEqual(op(2)));
        });
        test ('should be able to map contained value over functor even if it is not a ' +
            'function (call should internally wrap non-function values in functions', () => {
            Just.of()
                .ap(Just.of(99))
                .map(x => expect(x).toEqual(undefined));
        });
    });

});

describe('#just', () => {
    it ('should be a method', () => {
        expect(just).toBeInstanceOf(Function);
    });
    it ('should always return a `Just` instance', () => {
        [null, undefined, false, 0, () => undefined, [], {}, '']
            .forEach(x => {
                const result = just(x);
                expect(result).toBeInstanceOf(Just);
                expect(result.value).toEqual(x);
            });
    });
});
