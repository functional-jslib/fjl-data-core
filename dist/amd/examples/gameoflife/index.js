define(["fjl", "../../io/IO"], function (_fjl, _IO) {
  "use strict";

  _IO = _interopRequireDefault(_IO);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var Pos = function Pos(x, y) {
    _classCallCheck(this, Pos);

    this.x = (0, _fjl.isset)(x) ? x : 0;
    this.y = (0, _fjl.isset)(y) ? y : 0;
  };

  var Pointer =
  /*#__PURE__*/
  function () {
    function Pointer(board, pos) {
      _classCallCheck(this, Pointer);

      this.board = board || [];
      this.pos = pos || new Pos();
    }

    _createClass(Pointer, [{
      key: "updatePos",
      value: function updatePos(pos) {
        return new Pointer(this.board, pos);
      }
    }, {
      key: "extract",
      value: function extract() {
        return this.board[this.pos.x][this.pos.y];
      }
    }, {
      key: "extend",
      value: function extend(f) {
        var board = [],
            x,
            y;

        for (x = 0; x < this.board.length; x++) {
          board[x] = [];

          for (y = 0; y < this.board[x].length; y++) {
            board[x][y] = f(new Pointer(this.board, new Pos(x, y)));
          }
        }

        return new Pointer(board, this.pos);
      }
    }]);

    return Pointer;
  }();

  var SIZE = 100,
      SCALE = 8,
      posInBounds = function posInBounds(pos) {
    return pos.x >= 0 && pos.y >= 0 && pos.x < SIZE && pos.y < SIZE;
  },
      pointerNeighbours = function pointerNeighbours(pointer) {
    var offsets = [new Pos(-1, -1), new Pos(-1, 0), new Pos(-1, 1), new Pos(0, -1), new Pos(0, 1), new Pos(1, -1), new Pos(1, 0), new Pos(1, 1)],
        positions = (0, _fjl.filter)(posInBounds, (0, _fjl.map)(function (offset) {
      return new Pos(pointer.pos.x + offset.x, pointer.pos.y + offset.y);
    }, offsets));
    return (0, _fjl.map)(function (pos) {
      return pointer.updatePos(pos).extract();
    }, positions);
  },
      liveNeighbours = function liveNeighbours(pointer) {
    return (0, _fjl.length)((0, _fjl.filter)(_fjl.id, pointerNeighbours(pointer)));
  },
      rules = function rules(pointer) {
    var c = pointer.extract(),
        n = liveNeighbours(pointer);
    return c && (n < 2 || n > 3) ? false : c && n === 2 || n === 3 || c;
  },
      step = function step(board) {
    return new Pointer(board, new Pos(0, 0)).extend(rules).board;
  },
      generateBoard = function generateBoard() {
    return _IO.default.do(_IO.default.of(function () {
      var board = [],
          x,
          y;

      for (x = 0; x < SIZE; x++) {
        board[x] = [];

        for (y = 0; y < SIZE; y++) {
          board[x][y] = Math.random() > 0.5;
        }
      }

      return board;
    }));
  },
      drawBoard = function drawBoard(canvas, board) {
    return _IO.default.do(_IO.default.of(function () {
      var x, y;

      for (x = 0; x < board.length; x++) {
        for (y = 0; y < board[x].length; y++) {
          if (board[x][y]) {
            canvas.fillRect(x, y, 1, 1);
          } else {
            canvas.clearRect(x, y, 1, 1);
          }
        }
      }
    }));
  },
      loop = function loop(canvas, board) {
    return drawBoard(canvas, board).flatMap(function () {
      return requestAnimationFrame(function () {
        return loop(canvas, step(board));
      });
    });
  },
      main = function main() {
    var element = document.getElementById('game-of-comonads'),
        canvas = element.getContext('2d');
    return _IO.default.do(_IO.default.of(function () {
      element.width = SIZE * SCALE;
      element.height = SIZE * SCALE;
      canvas.scale(SCALE, SCALE);
    }).flatMap(generateBoard).flatMap(function (board) {
      return loop(canvas, board);
    }));
  };

  window.addEventListener('load', main);
});