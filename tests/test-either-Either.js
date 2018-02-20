import {isLeft, Left, Right} from '../src/either/Either';
import {expect, assert} from 'chai';
import {all, map} from 'fjl';

describe('#Either', () => {
    describe('#Left', () => {
        const methodNames = ['ap', 'map', 'flatMap', 'join'];
        describe ('`isLeft`', () => {
            test ('should return an instance when called with `new`, as a function and with static `of` method', () => {
                [Left(), new Left(), Left.of()].forEach(x => {
                    expect(isLeft(x)).to.equal(true);
                });
            });

            test ('should return `false` when a value is not a `Left`', () => {
                [false, 0, () => ({}), [], {}].forEach(x => {
                    expect(isLeft(x)).to.equal(false);
                });
            });
        });
        test ('Expect it to be extendable via es6 `class` syntax', () => {
            class Hello extends Left {
                constructor (something) {
                    super(something);
                }
            }
            expect(new Hello()).to.be.instanceOf(Left);
        });
        test ('Expect `map`, `ap`, `flatMap`, and `join` methods to exist', () => {
            const left = Left();
            expect(
                all(methodName =>
                        (left[methodName] instanceof Function),
                    methodNames
                )
            )
                .to.equal(true);
        });
        test ('Expect `map`, `ap`, `flatMap`, and `join` methods to all return same instance of `Left`', () => {
            const left = Left('Only left');
            expect(left.join()).to.equal(left);
            expect(left.map(x => x)).to.equal(left);
            expect(left.flatMap(x => Left(x))).to.equal(left);
        });
    });

    describe('#Right', () => {
        test('should have more tests');
    });

});
