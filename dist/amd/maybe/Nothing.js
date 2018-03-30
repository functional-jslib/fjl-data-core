"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
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
},
    returnThis = function returnThis() {
    return this;
},
    prototype = Nothing.prototype;

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

exports.isNothing = isNothing;
exports.default = Nothing;