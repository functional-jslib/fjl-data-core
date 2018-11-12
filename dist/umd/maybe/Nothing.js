(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.Nothing = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.nothing = _exports.isNothing = void 0;
  var NothingSingleton;

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
  },
      nothing = function nothing() {
    return new Nothing();
  },
      returnThis = function returnThis() {
    return this;
  },
      prototype = Nothing.prototype; // Methods


  _exports.nothing = nothing;
  _exports.isNothing = isNothing;
  prototype.valueOf = returnThis;
  prototype.join = returnThis;
  prototype.map = returnThis;
  prototype.ap = returnThis;
  prototype.flatMap = returnThis; // Set statics

  Nothing.of = function () {
    return new Nothing();
  };

  Nothing.isNothing = isNothing;
  Nothing.nothing = nothing; // Object.freeze makes properties on object immutable
  // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
  // Saves us from having to do the following (great!):
  // Object.defineProperties(Nothing, {
  //     of: {value: () => new Nothing(), enumerable: true},
  //     isNothing: {value: isNothing, enumerable: true}
  // });

  Object.freeze(Nothing);
  var _default = Nothing;
  _exports.default = _default;
});