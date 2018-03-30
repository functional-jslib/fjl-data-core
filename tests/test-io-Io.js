import IO from '../src/io/IO';
import {expect, assert} from 'chai';
import {all, map, reverse, intersperse, replicate, concat, compose} from 'fjl';
import {log, peek} from "./utils";
import Monad from "../src/monad/Monad";

describe('#IO', () => {
    test ('should return instances of `Monad`', () => {
        expect(new IO()).to.be.instanceOf(Monad);
    });

    describe ('#unsafePerformIO', () => {
        test ('should call stored operation when called', () => {
            const reverseStr = compose(x => peek('reverseStr', x), reverse),
                otherStrOp = compose(x => peek('otherStrOp', x), concat, intersperse('-'), replicate(3)),
                peekIO = IO.of(peek),
                io = peekIO
                    .flatMap(fn => _ => fn(otherStrOp(_)))
                    .flatMap(fn => IO.of(_ => fn(reverseStr(_))))
                ;

            io.map(fn => expect(fn('hello')).to.equal(
                        io.unsafePerformIO('hello').join()()
                    ));

            io.unsafePerformIO('hello')
                .map(fn => expect(fn()).to.equal(
                        compose(otherStrOp, reverse)('hello')
                    ));
        });

        test ('should be flat-mappable', () => {
            const io = IO.of(compose(concat, intersperse('-'), replicate(3))),
                io2 =
                    io
                        .flatMap(fn => IO.of(_ => fn(_).split('-').shift()))
                        .flatMap(fn => _ => peek('io2', fn(_)));

            io.map(fn => expect(fn('hello')).to.equal('hello-hello-hello'));
            io.unsafePerformIO('hello') // Transform 'hello' value
                .map(fn => expect(fn()).to.equal('hello-hello-hello'));
        });

        test ('should be able to build up an operation from many smaller operations', () => {
            const ioAlphabet = IO.of((startChar, endChar) =>
                [startChar, endChar].map(x => x.charCodeAt(0)))
                .map(fn => (startChar, endChar) => {
                    const [start, end] = fn(startChar, endChar);
                    let out = '';
                    for (let ind = start; ind <= end; ind += 1) {
                        out += String.fromCharCode(ind);
                    }
                    return out;
                })
                .map(fn => (startChar, endChar) => reverse(fn(startChar, endChar)));

            // Instance of
            expect(ioAlphabet).to.be.instanceOf(IO);

            // Check results
            ioAlphabet.unsafePerformIO('a', 'z')
                .map(fn => expect(fn()).to.equal(
                    reverse('abcdefghijklmnopqrstuvwxyz')));

            // Test outputs
            log (
                ioAlphabet,
                ioAlphabet
                    .unsafePerformIO('a', 'z')
                    .map(fn => log(fn()))
            );
        });
    });

});
