import {isLeft, isRight, Left, Right, either} from '../src/either/Either';
import {expect, assert} from 'chai';
import {all, map} from 'fjl';
import {log} from "./utils";

describe('#Either', () => {
    const methodNames = ['ap', 'map', 'flatMap', 'join'];

    describe('#Left', () => {
        test ('should return an instance when called with `new`, when called as a function, and when called via static `of` method', () => {
            [new Left(), Left.of()].forEach(x => {
                expect(x instanceof Left).toEqual(true);
            });
        });
        test ('Expect it to be extendable via es6 `class` syntax', () => {
            class Hello extends Left {
                constructor (something) {
                    super(something);
                }
            }
            expect(new Hello()).toBeInstanceOf(Left);
        });
        test ('Expect `map`, `ap`, `flatMap`, and `join` methods to exist', () => {
            const left = Left.of();
            expect(
                all(methodName =>
                        (left[methodName] instanceof Function),
                    methodNames
                )
            )
                .toEqual(true);
        });
        test ('Expect `map` and `flatMap` should return instances of `Left`', () => {
            expect(Left.of('something').map(x => x)).toBeInstanceOf(Left);
            expect(Left.of('something-else').flatMap(x => Left.of(x))).toBeInstanceOf(Left);
        });
        test ('Expect calling `ap` on a `#Left` to return containing value of `Left`', () => {
            const value = 'Hello World',
                left = Left.of(value);
            left.ap(Right.of(99)).map(x => expect(x).toEqual(value));
        });
        test ('#join should return whatever is contained within `Left`', () => {
            expect(Left.of(99).join()).toEqual(99);
        });

        describe ('`isLeft`', () => {
            test ('should return `true` when value is a `Left`', () => {
                [Left.of(), new Left(), Left.of()].forEach(x => {
                    expect(isLeft(x)).toEqual(true);
                });
            });
            test ('should return `false` when a value is not a `Left`', () => {
                [false, 0, () => ({}), [], {}].forEach(x => {
                    expect(isLeft(x)).toEqual(false);
                });
            });
        });
    });

    describe('#Right', () => {
        test ('should return an instance when called with `new`, when called as a function, and when called via static `of` method', () => {
            [Right.of(), new Right(), Right.of()].forEach(x => {
                expect(x instanceof Right).toEqual(true);
            });
        });
        test ('Expect it to be extendable via es6 `class` syntax', () => {
            class Hello extends Right {
                constructor (something) {
                    super(something);
                }
            }
            expect(new Hello()).toBeInstanceOf(Right);
        });
        test ('Expect `map`, `ap`, `flatMap`, and `join` methods to exist', () => {
            const right = Right.of();
            expect(
                all(methodName =>
                        (right[methodName] instanceof Function),
                    methodNames
                )
            )
                .toEqual(true);
        });
        test ('Expect `map`, `flatMap`, and `join` methods to return a new instance of `Right`', () => {
            const right = Right.of('Only right');
            // expect(Right.of(right).join()).toBeInstanceOf(Right);
            expect(right.map(x => x)).toBeInstanceOf(Right);
            expect(right.flatMap(x => Right.of(x))).toBeInstanceOf(Right);
        });
        test ('Expect calling `ap` on a `#Right` to return containing value of `Right`', () => {
            const value = 'Hello World',
                right = Right.of(value);
            right.ap(Right.of(99)).map(x => expect(x).toEqual(value));
        });

        describe ('`isRight`', () => {
            test ('should return `true` when value is a `Right`', () => {
                [Right.of(), new Right(), Right.of()].forEach(x => {
                    expect(isRight(x)).toEqual(true);
                });
            });
            test ('should return `false` when a value is not a `Right`', () => {
                [false, 0, () => ({}), [], {}].forEach(x => {
                    expect(isRight(x)).toEqual(false);
                });
            });
        });
    });

    describe ('#either', () => {
        test ('should return an "#Either" (a `Right` or an `Left`)', () => {
            const rightOp = x => x * 2,
                expectedLeft = 'incoming value ignored',
                expectedRight = rightOp(99);

            expect(
                either(() => expectedLeft, () => undefined, Right.of())
            ).toEqual(expectedLeft);

            expect(
                either(x => x, rightOp, Right.of(99))
            ).toEqual(expectedRight);
        });
    });

});
