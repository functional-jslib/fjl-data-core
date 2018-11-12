import IO from '../src/io/IO';
import {expect, assert} from 'chai';
import {all, map, reverse, intersperse, replicate, concat, compose} from 'fjl';
import {log, peek} from "./utils";
import Monad from "../src/monad/Monad";

describe('#IO', () => {

    const reverseStr = xs => xs.split('').reverse().join('');

    test ('should return instances of `Monad`', () => {
        expect(new IO()).toBeInstanceOf(Monad);
    });

    test ('should be flat-mappable', () => {
        const op1 = compose(concat, intersperse('-'), replicate(3)),
            op2 = compose(xs => { let newXs = xs.split('-'); newXs.shift(); return newXs.join('-'); }, op1),
            io = IO.of(compose(x => peek('io1', x), op1)),
            io2 = IO.of(compose(x => peek('io2', x), op2));
        IO.do(io, 'hello').flatMap(x => expect(peek(x)).toEqual(peek('should equal', op1('hello'))));
        IO.do(io2, 'hello').flatMap(x => expect(x).toEqual(peek('should equal', op2('hello'))));
    });

    test ('should be mappable', () => {
        const op1 = compose(concat, intersperse('-'), replicate(3)),
            op2 = compose(xs => { let newXs = xs.split('-'); newXs.shift(); return newXs.join('-'); }, op1),
            io = IO.of(compose(x => peek('io1', x), op1)),
            io2 = IO.of(compose(x => peek('io2', x), op2));
        IO.do(io, 'hello').map(x => expect(peek(x)).toEqual(peek('should equal', op1('hello'))));
        IO.do(io2, 'hello').map(x => expect(x).toEqual(peek('should equal', op2('hello'))));
    });

    describe ('#do', () => {
        test ('should run given IO instance with any args passed in', () => {
            const otherStrOp = compose(
                    IO.of,
                    xs => xs.join(''),
                    x => peek('otherStrOp', x),
                    concat,
                    intersperse('-'),
                    replicate(3),
                    xs => xs.split('')
                ),
                op = compose(peek, otherStrOp, reverseStr),
                io = IO.of(op);

            IO.do(io, 'hello').map(x => peek('do', x));
            IO.do(io, 'hello')
                // .flatMap(x => IO.of(peek('do', x)))
                // .flatMap(x => expect(x).toEqual(op('hello').join()()));
            // expect(.join()()).toEqual(op('hello'));
            // io.map(fn => expect(fn('hello')).toEqual(compose(join, otherStrOp, reverseStr)('hello')));
        });

        test ('should process io no matter how many nested IO\'s are produced', () => {
            const ioAlphabet = IO.of(compose(
                xs => peek(reverseStr(xs)),
                ([start, end]) => {
                    let out = '';
                    for (let ind = start; ind <= end; ind += 1) {
                        out += String.fromCharCode(ind);
                    }
                    return out;
                },
                ([startChar, endChar]) => [startChar, endChar].map(x => x.charCodeAt(0)),
            ));

            // Instance of
            expect(ioAlphabet).toBeInstanceOf(IO);

            // Check results
            IO.do(ioAlphabet, ['a', 'z'])
                .flatMap(xs => expect(xs).toEqual(
                    reverseStr('abcdefghijklmnopqrstuvwxyz')));

            // Test outputs
            log (
                ioAlphabet,
                IO.do(ioAlphabet, ['a', 'z'])
                    .flatMap(xs => log(xs))
            );
        });
    });

});
