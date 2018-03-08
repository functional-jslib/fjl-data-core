import Io from '../src/io/Io';
import {expect, assert} from 'chai';
import {all, map, reverse, intersperse, replicate, concat, compose} from 'fjl';
import {log, peek} from "./utils";
import Monad from "../src/monad/Monad";

describe('#Io', () => {
    test ('should return instances of `Monad`', () => {
        expect(new Io()).to.be.instanceOf(Monad);
    });
    describe ('#unsafePerformIo', () => {
        test ('should call stored operation when called', () => {
            const reverseStr = compose(x => peek('reverseStr', x), reverse),
                otherStrOp = compose(x => peek('otherStrOp', x), concat, intersperse('-'), replicate(3)),
                peekIo = Io.of(peek),
                io = peekIo
                    .flatMap(fn => Io.of(_ => fn(otherStrOp(_))))
                    .flatMap(fn => Io.of( _ => fn(reverseStr(_))))
                ;

            // io.map(fn => expect(fn('hello')).to.be.instanceOf(Io));
            io.unsafePerformIo('hello') // Transform 'hello' value
                .map(fn => expect(fn()).to.equal('hello-hello-hello'));
        });
        test ('should be flat-mappable', () => {
            const io = Io.of(compose(concat, intersperse('-'), replicate(3)));
            const io2 = io.flatMap(fn => Io.of(fn().split('-').shift()))
                    .flatMap(fn => peek('io2', fn('hello')));

            io.map(fn => expect(fn()).to.equal('hello'));
            io.unsafePerformIo('hello') // Transform 'hello' value
                .map(fn => expect(fn()).to.equal('hello-hello-hello'));
        });
        test ('should be able to build up an operation from many smaller operations', () => {
            const ioAlphabet = Io.of((startChar, endChar) =>
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
            expect(ioAlphabet).to.be.instanceOf(Io);

            // Check results
            ioAlphabet.unsafePerformIo('a', 'z')
                .map(x => expect(x.join()()).to.equal(
                    reverse('abcdefghijklmnopqrstuvwxyz')));

            // Test outputs
            log (
                ioAlphabet,
                ioAlphabet
                    .unsafePerformIo('a', 'z')
                    .map(fn => log(fn()))
            );
        });
    });

});
