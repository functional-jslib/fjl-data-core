import {expect, assert} from 'chai';
import Nothing from '../src/maybe/Nothing';
import {all, map} from 'fjl';

describe ('data.maybe.Nothing', () => {
    const methodNames = ['ap', 'map', 'flatMap', 'join'];
    test ('Should return singleton instance of `Nothing` whenever called with `new`', () => {
        expect(new Nothing() === new Nothing()).to.equal(true);
    });
    test ('Should return singleton instance when called as a function', () => {
        expect(Nothing() === Nothing() && Nothing() === new Nothing())
            .to.equal(true);
    });
    test ('Should return singleton instance when called with via static factory (`of`)', () => {
        expect(Nothing.of() === Nothing.of() && Nothing.of() === new Nothing())
            .to.equal(true);
    });
    test ('Expect calling `Nothing` as a function, with `new` keyword, or via static `of` method, to all ' +
        'equate to same singleton instance of `Nothing`', () => {
        const nothing = Nothing();
        expect(
            all(
                nothing1 => nothing === nothing1,
                [Nothing(), new Nothing(), Nothing.of()]
            )
        )
            .to.equal(true);
    });
    test ('Expect it to be extendable via es6 `class` syntax', () => {
        class Hello extends Nothing {
            constructor (something) {
                super(something);
            }
        }
        expect(new Hello() === new Nothing()).to.equal(true);
    });
    test ('Expect `map`, `ap`, `flatMap`, and `join` methods to exist', () => {
        const nothing = Nothing();
        expect(
            all(methodName =>
                (nothing[methodName] instanceof Function),
                methodNames
            )
        )
            .to.equal(true);
    });
    test ('Expect `map`, `ap`, `flatMap`, and `join` methods to all return same singleton instance of `Nothing`', () => {
        const nothing = Nothing();
        expect(
            all(
                result => result === nothing,
                map(methodName => nothing[methodName](), methodNames)
            )
        )
            .to.equal(true);
    })
});
