import {map, filter, length, id} from 'fjl';

import IO from '../../io/IO';

class Pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Pointer {
    constructor (board, pos) {
        this.board = board;
        this.pos = pos;
    }
    updatePos (pos) {
        return new Pointer(this.board, pos);
    }
    extract () {
        return this.board[this.pos.x][this.pos.y];
    }
    extend (f) {
        let board = [], x, y;
        for (x = 0; x < this.board.length; x++) {
            board[x] = [];
            for (y = 0; y < this.board[x].length; y++) {
                board[x][y] = f(new Pointer(this.board, new Pos(x, y)));
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
                map(offset =>
                    new Pos(
                        pointer.pos.x + offset.x,
                        pointer.pos.y + offset.y
                    ),
                    offsets
                ),
                posInBounds
            );
        return map(pos => pointer.updatePos(pos).extract(), positions);
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
        IO.of(() => {
            let board = [], x, y;
            for (x = 0; x < SIZE; x++) {
                board[x] = [];
                for (y = 0; y < SIZE; y++) {
                    board[x][y] = Math.random() > 0.5;
                }
            }
            return board;
        }),

    drawBoard = (canvas, board) =>
        IO.of(() => {
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
            .flatMap(() => loop(canvas, step(board)).fork()),

    main = () => {
        const
            element = document.getElementById('game-of-comonads'),
            canvas = element.getContext('2d');

        return IO.of(() => {
            element.width = SIZE * SCALE;
            element.height = SIZE * SCALE;
            canvas.scale(SCALE, SCALE);
        })
            .flatMap(generateBoard)
            .flatMap(loop)

            // Perform effects!
            .unsafePerformIO(); // Could also call `do` here (instead)
    };

window.addEventListener('load', main);
