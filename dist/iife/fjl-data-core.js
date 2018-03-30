var fjlDataCore = (function (exports,fjl) {
'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * Created by edlc on 12/9/16.
 */
var Functor = function () {
    function Functor(value) {
        classCallCheck(this, Functor);

        this.value = value;
    }

    createClass(Functor, [{
        key: "valueOf",
        value: function valueOf() {
            return this.value;
        }
    }, {
        key: "map",
        value: function map(fn) {
            return new this.constructor(fn(this.valueOf()));
        }
    }, {
        key: "fmap",
        value: function fmap(fn) {
            return this.map(fn);
        }
    }]);
    return Functor;
}();

var toFunction = function toFunction(x) {
    return fjl.isFunction(x) ? x : function () {
        return x;
    };
};
var alwaysFunctor = function alwaysFunctor(x) {
    return !x.map ? new Functor(x) : x;
};

/**
 * Created by edlc on 12/9/16.
 */

var Apply = function (_Functor) {
    inherits(Apply, _Functor);

    function Apply() {
        classCallCheck(this, Apply);
        return possibleConstructorReturn(this, (Apply.__proto__ || Object.getPrototypeOf(Apply)).apply(this, arguments));
    }

    createClass(Apply, [{
        key: 'ap',
        value: function ap(x) {
            return x.map(toFunction(this.valueOf()));
        }
    }]);
    return Apply;
}(Functor);

/**
 * Created by edlc on 12/9/16.
 */
var Applicative = function (_Apply) {
    inherits(Applicative, _Apply);

    function Applicative() {
        classCallCheck(this, Applicative);
        return possibleConstructorReturn(this, (Applicative.__proto__ || Object.getPrototypeOf(Applicative)).apply(this, arguments));
    }

    createClass(Applicative, null, [{
        key: 'of',
        value: function of(value) {
            return new Applicative(value);
        }
    }]);
    return Applicative;
}(Apply);

/**
 * Created by edlc on 12/9/16.
 * Basic `Monad` class.  Used to extend from to create `Maybe` and `Either` module/classes.
 * @module Monad
 * @see `Maybe` reference: http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Maybe.html
 * @see `Either` reference: http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Either.html
 */

var _isMonad = function _isMonad(value) {
    return value instanceof Monad;
};
var valueOf = function valueOf(x) {
    return x.valueOf();
};
var join = function join(x) {
    return x.join();
};
var fmap = fjl.curry(function (fn, x) {
    return x.map(fn);
});
var ap = fjl.curry(function (applicative, functor) {
    return applicative.ap(functor);
});
var flatMap = fjl.curry(function (fn, monad) {
    return monad.flatMap(fn);
});

var Monad = function (_Applicative) {
    inherits(Monad, _Applicative);

    function Monad() {
        classCallCheck(this, Monad);
        return possibleConstructorReturn(this, (Monad.__proto__ || Object.getPrototypeOf(Monad)).apply(this, arguments));
    }

    createClass(Monad, [{
        key: 'join',
        value: function join() {
            return this.valueOf();
        }
    }, {
        key: 'flatMap',
        value: function flatMap(fn) {
            var out = fn(this.join());
            return !(out instanceof this.constructor) ? this.constructor.of(out) : out;
        }
    }, {
        key: 'chain',
        value: function chain(fn) {
            return this.flatMap(fn);
        }
    }], [{
        key: 'of',
        value: function of(x) {
            return new Monad(x);
        }
    }, {
        key: 'isMonad',
        value: function isMonad(x) {
            return _isMonad(x);
        }
    }]);
    return Monad;
}(Applicative);

var NothingSingleton = void 0;

function Nothing() {
    if (NothingSingleton) {
        return NothingSingleton;
    } else if (!(this instanceof Nothing)) {
        return new Nothing();
    }
    NothingSingleton = this;
    Object.freeze(NothingSingleton);
}

var isNothing = function isNothing(x) {
    return x === NothingSingleton;
};
var returnThis = function returnThis() {
    return this;
};
var prototype = Nothing.prototype;

// Methods
prototype.valueOf = returnThis;
prototype.join = returnThis;
prototype.map = returnThis;
prototype.ap = returnThis;
prototype.flatMap = returnThis;

// Set statics
Nothing.of = function () {
    return new Nothing();
};
Nothing.isNothing = isNothing;

// Object.freeze makes properties on object immutable
// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
// Saves us from having to do the following (great!):
// Object.defineProperties(Nothing, {
//     of: {value: () => new Nothing(), enumerable: true},
//     isNothing: {value: isNothing, enumerable: true}
// });
Object.freeze(Nothing);

var _isJust = function _isJust(x) {
    return x instanceof Just;
};

var Just = function (_Monad) {
    inherits(Just, _Monad);

    function Just() {
        classCallCheck(this, Just);
        return possibleConstructorReturn(this, (Just.__proto__ || Object.getPrototypeOf(Just)).apply(this, arguments));
    }

    createClass(Just, [{
        key: 'map',
        value: function map(fn) {
            var constructor = this.constructor,
                value = this.valueOf();

            return fjl.isset(value) && !isNothing(value) ? constructor.of(fn(value)) : constructor.counterConstructor.of(value);
        }
    }], [{
        key: 'of',
        value: function of(x) {
            return new Just(x);
        }
    }, {
        key: 'isJust',
        value: function isJust(x) {
            return _isJust(x);
        }
    }]);
    return Just;
}(Monad);

Just.counterConstructor = Nothing;

var maybe = fjl.curry(function (replacement, fn, maybeInst) {
    var subject = fjl.isset(maybeInst) && isMaybe(maybeInst) ? maybeInst.map(fjl.id) : Nothing.of();
    return isNothing(subject) ? replacement : subject.map(fn).join();
});
var isMaybe = function isMaybe(x) {
    return isNothing(x) || _isJust(x);
};

/**
 * Created by elyde on 12/10/2016.
 */

var Left = function (_Monad) {
    inherits(Left, _Monad);

    function Left() {
        classCallCheck(this, Left);
        return possibleConstructorReturn(this, (Left.__proto__ || Object.getPrototypeOf(Left)).apply(this, arguments));
    }

    createClass(Left, null, [{
        key: 'of',
        value: function of(x) {
            return new Left(x);
        }
    }]);
    return Left;
}(Monad);

var Right = function (_Just) {
    inherits(Right, _Just);

    function Right() {
        classCallCheck(this, Right);
        return possibleConstructorReturn(this, (Right.__proto__ || Object.getPrototypeOf(Right)).apply(this, arguments));
    }

    createClass(Right, [{
        key: 'map',
        value: function map(fn) {
            var value = this.valueOf();
            if (isLeft(value)) {
                return value;
            } else if (!fjl.isset(value)) {
                return Left.of('TypeError: Cannot operate on `null` and/or `undefined`.  ' + ('Value given `' + value + '`.'));
            }
            return Right.of(fn(value));
        }
    }], [{
        key: 'of',
        value: function of(x) {
            return new Right(x);
        }
    }]);
    return Right;
}(Just);

var isRight = function isRight(x) {
    return x instanceof Right;
};
var isLeft = function isLeft(x) {
    return x instanceof Left;
};
var either = fjl.curry(function (leftCallback, rightCallback, monad) {
    var identity = alwaysFunctor(monad).map(fjl.id);
    switch (identity.constructor) {
        case Left:
            return identity.map(toFunction(leftCallback)).join();
        case Right:
            return identity.map(toFunction(rightCallback)).join();
        default:
            return Left.of(monad).map(leftCallback).join();
    }
});

/**
 * Created by elydelacruz on 2/19/2017.
 */

var IO = function (_Monad) {
    inherits(IO, _Monad);

    function IO(fn) {
        classCallCheck(this, IO);
        return possibleConstructorReturn(this, (IO.__proto__ || Object.getPrototypeOf(IO)).call(this, toFunction(fn)));
    }

    createClass(IO, [{
        key: 'fork',
        value: function fork() {
            return this.map(function (fn) {
                return fn();
            });
        }
    }, {
        key: 'do',
        value: function _do() {
            return IO.of(this.join().apply(undefined, arguments));
        }
    }, {
        key: 'unsafePerformIO',
        value: function unsafePerformIO() {
            return this.do.apply(this, arguments);
        }
    }], [{
        key: 'of',
        value: function of(fn) {
            return new IO(fn);
        }
    }, {
        key: 'isIO',
        value: function isIO(x) {
            return x instanceof IO;
        }
    }]);
    return IO;
}(Monad);

/**
 * Created by elydelacruz on 2/19/2017.
 * @module fjlDataCore
 * Core monad types (useful for javascript).
 */

exports.isMonad = _isMonad;
exports.valueOf = valueOf;
exports.join = join;
exports.fmap = fmap;
exports.ap = ap;
exports.flatMap = flatMap;
exports.Just = Just;
exports.isJust = _isJust;
exports.isNothing = isNothing;
exports.Nothing = Nothing;
exports.maybe = maybe;
exports.isMaybe = isMaybe;
exports.isRight = isRight;
exports.isLeft = isLeft;
exports.either = either;
exports.Left = Left;
exports.Right = Right;
exports.toFunction = toFunction;
exports.alwaysFunctor = alwaysFunctor;

return exports;

}({},fjl));
//# sourceMappingURL=fjl-data-core.js.map
