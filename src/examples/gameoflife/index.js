import {isset, map, filter, length, id} from 'fjl';
import IO from '../../io/IO';

class Pos {
    constructor(x, y) {
        this.x = isset(x) ? x : 0;
        this.y = isset(y) ? y : 0;
    }
}

class Pointer {
    constructor (board, pos) {
        this.board = board || [];
        this.pos = pos || new Pos();
    }
    map (pos) {
        return new Pointer(this.board, pos);
    }
    extract () {
        return this.board[this.pos.x][this.pos.y];
    }
    extend (fn) {
        let board = [], x, y;
        for (x = 0; x < this.board.length; x++) {
            board[x] = [];
            for (y = 0; y < this.board[x].length; y++) {
                board[x][y] = fn(new Pointer(this.board, new Pos(x, y)));
            }
        }
        return new Pointer(board, this.pos);
    }
}

const
    SIZE = 100,
    SCALE = 8,

    posInBounds = pos =>
        pos.x >= 0 && pos.y >= 0 &&
        pos.x < SIZE && pos.y < SIZE,

    pointerNeighbours = pointer => {
        let offsets = [
                new Pos(-1, -1),
                new Pos(-1, 0),
                new Pos(-1, 1),
                new Pos(0, -1),
                new Pos(0, 1),
                new Pos(1, -1),
                new Pos(1, 0),
                new Pos(1, 1)
            ],
            positions = filter(
                posInBounds,
                map(offset => new Pos(
                        pointer.pos.x + offset.x,
                        pointer.pos.y + offset.y
                    ),
                    offsets
                )
            );
        return map(pos => pointer.map(pos).extract(), positions);
    },

    liveNeighbours = pointer =>
        length(filter(id, pointerNeighbours(pointer))),

    rules = pointer => {
        let c = pointer.extract(),
            n = liveNeighbours(pointer);

        return c && (n < 2 || n > 3) ?
            false : (c && n === 2) || n === 3 || c;
    },

    step = board =>
        new Pointer(board, new Pos(0, 0)).extend(rules).board,

    generateBoard = () =>
        IO.do(IO.of(() => {
            let board = [], x, y;
            for (x = 0; x < SIZE; x++) {
                board[x] = [];
                for (y = 0; y < SIZE; y++) {
                    board[x][y] = Math.random() > 0.5;
                }
            }
            return board;
        })),

    drawBoard = (canvas, board) =>
        IO.do(() => {
            let x, y;
            for (x = 0; x < board.length; x++) {
                for (y = 0; y < board[x].length; y++) {
                    if (board[x][y]) {
                        canvas.fillRect(x, y, 1, 1);
                    } else {
                        canvas.clearRect(x, y, 1, 1);
                    }
                }
            }
        }),

    loop = (canvas, board) =>
        drawBoard(canvas, board)
            .flatMap(() => requestAnimationFrame(() => loop(canvas, step(board)))),

    main = () => {
        const
            element = document.getElementById('game-of-comonads'),
            canvas = element.getContext('2d');

        return IO.do(() => {
                element.width = SIZE * SCALE;
                element.height = SIZE * SCALE;
                canvas.scale(SCALE, SCALE);
            })
            .flatMap(generateBoard)
            .flatMap(board => loop(canvas, board));
    };

window.addEventListener('load', main);
