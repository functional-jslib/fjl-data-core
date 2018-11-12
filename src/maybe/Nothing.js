let NothingSingleton;

function Nothing () {
    if (NothingSingleton) {
        return NothingSingleton;
    }
    else if (!(this instanceof Nothing)) {
        return new Nothing();
    }
    NothingSingleton = this;
    Object.freeze(NothingSingleton);
}

const isNothing = x => x === NothingSingleton,

    nothing = () => new Nothing(),

    // Prototypical stuff
    returnThis = function () { return this; },
    {prototype} = Nothing;

// Methods
prototype.valueOf   = returnThis;
prototype.join      = returnThis;
prototype.map       = returnThis;
prototype.ap        = returnThis;
prototype.flatMap   = returnThis;

// Set statics
Nothing.of  = () => new Nothing();
Nothing.isNothing = isNothing;
Nothing.nothing = nothing;

// Object.freeze makes properties on object immutable
// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
// Saves us from having to do the following (great!):
// Object.defineProperties(Nothing, {
//     of: {value: () => new Nothing(), enumerable: true},
//     isNothing: {value: isNothing, enumerable: true}
// });
Object.freeze(Nothing);

export {isNothing, nothing};

export default Nothing;
