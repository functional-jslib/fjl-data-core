import {isLeft, Left, Right} from '../src/either/Either';
import {expect, assert} from 'chai';
import {all, map} from 'fjl';

describe('#Either', () => {
    const methodNames = ['ap', 'map', 'flatMap', 'join'];

    describe('#Left', () => {
        test ('should return an instance when called with `new`, when called as a function, and when called via static `of` method', () => {
            [Left(), new Left(), Left.of()].forEach(x => {
                expect(x instanceof Left).to.equal(true);
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
        test ('Expect `map`, `flatMap`, and `join` methods to all return same constructed instance of `Left`', () => {
            const left = Left('Only left');
            expect(left.join()).to.equal(left);
            expect(left.map(x => x)).to.equal(left);
            expect(left.flatMap(x => Left(x))).to.equal(left);
        });
        test ('Expect calling `ap` on a `#Left` to return containing value of `Left`', () => {
            const value = 'Hello World',
                left = Left(value);
            left.ap(Right(99)).map(x => expect(x).to.equal(value));
        });

        describe ('`isLeft`', () => {
            test ('should return `true` when value is a `Left`', () => {
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
    });

    describe('#Right', () => {
        test ('should return an instance when called with `new`, when called as a function, and when called via static `of` method', () => {
            [Right(), new Right(), Right.of()].forEach(x => {
                expect(x instanceof Right).to.equal(true);
            });
        });
        test ('Expect it to be extendable via es6 `class` syntax', () => {
            class Hello extends Right {
                constructor (something) {
                    super(something);
                }
            }
            expect(new Hello()).to.be.instanceOf(Right);
        });
        test ('Expect `map`, `ap`, `flatMap`, and `join` methods to exist', () => {
            const right = Right();
            expect(
                all(methodName =>
                        (right[methodName] instanceof Function),
                    methodNames
                )
            )
                .to.equal(true);
        });
        test ('Expect `map`, `flatMap`, and `join` methods to return a new instance of `Right`', () => {
            const right = Right.of('Only right');
            expect(right.join()).to.be.instanceOf(Right);
            expect(right.map(x => x)).to.be.instanceOf(Right);
            expect(right.flatMap(x => Right.of(x))).to.be.instanceOf(Right);
        });
        test ('Expect calling `ap` on a `#Right` to return containing value of `Right`', () => {
            const value = 'Hello World',
                right = Right.of(value);
            right.ap(Right.of(99)).map(x => expect(x).to.equal(value));
        });

    });

});
