(function () {
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





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/**
 * Created by elyde on 12/18/2016.
 * @memberOf _objectOps
 */
var _Number = Number.name;
var _NaN = 'NaN';
var _Null = 'Null';
var _Undefined = 'Undefined';

/**
 * Returns the constructor/class/type name of a value.
 * @note Returns 'NaN' if value is of type `Number` and value is `isNaN`.
 * @note Returns 'Undefined' if value is `undefined`
 * @note Returns 'Null' if value is `null`
 * For values that have no concrete constructors and/or casters
 * (null, NaN, and undefined) we returned normalized names for them ('Null', 'NaN', 'Number')
 * @function module:_objectOps.typeOf
 * @param value {*}
 * @returns {string} - Constructor's name or derived name (in the case of `null`, `undefined`, or `NaN` (whose
 *  normalized names are 'Null', 'Undefined', 'NaN' respectively).
 */
function typeOf(value) {
    var retVal = void 0;
    if (value === undefined) {
        retVal = _Undefined;
    } else if (value === null) {
        retVal = _Null;
    } else {
        var constructorName = value.constructor.name;
        retVal = constructorName === _Number && isNaN(value) ? _NaN : constructorName;
    }
    return retVal;
}

var fPureTakesOne = function fPureTakesOne(name) {
    return function (arg, f) {
        return f[name](arg);
    };
};
var fPureTakes2 = function fPureTakes2(name) {
    return function (arg1, arg2, f) {
        return f[name](arg1, arg2);
    };
};
var fPureTakesOneOrMore = function fPureTakesOneOrMore(name) {
    return function (f) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return f[name].apply(f, args);
    };
};
var fnOrError = function fnOrError(symbolName, f) {
    if (!f || f.constructor !== Function) {
        throw new Error(symbolName + ' should be a function. ' + ('Type received: ' + typeOf(f) + ';  Value received: ' + f + '.'));
    }
    return f;
};

/**
 * Created by elydelacruz on 9/6/2017.
 * Defines some of the platform methods for objects (the ones used within `fjl`) uncurried for use
 * throughout the library.  @note Doesn't include all methods for objects just the ones used in
 *  the library.
 * @todo change all files named '*UnCurried' to '*_'.
 */

var instanceOf$1 = function instanceOf$1(instanceConstructor, instance) {
    return instance instanceof instanceConstructor;
};
var hasOwnProperty$1 = fPureTakesOne('hasOwnProperty');
var length = function length(x) {
    return x.length;
};
var keys = function keys(obj) {
    return Object.keys(obj);
};
var assign$1 = function () {
    return Object.assign ? function (obj0) {
        for (var _len2 = arguments.length, objs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            objs[_key2 - 1] = arguments[_key2];
        }

        return Object.assign.apply(Object, [obj0].concat(objs));
    } : function (obj0) {
        for (var _len3 = arguments.length, objs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            objs[_key3 - 1] = arguments[_key3];
        }

        return objs.reduce(function (topAgg, obj) {
            return keys(obj).reduce(function (agg, key) {
                agg[key] = obj[key];
                return agg;
            }, topAgg);
        }, obj0);
    };
}();

/**
 *  List operations that overlap (apart from globally overlapping props and functions like `length`)
 *      on both strings and arrays.
 */

var concat = fPureTakesOneOrMore('concat');
var slice = fPureTakes2('slice');
var includes = function () {
    return 'includes' in Array.prototype ? fPureTakesOne('includes') : function (value, xs) {
        return xs.indexOf(value) > -1;
    };
}();
var indexOf = fPureTakesOne('indexOf');
var lastIndexOf = fPureTakesOne('lastIndexOf');

/**
 * Created by elydelacruz on 9/6/2017.
 */

/**
 * Functional version of `String.prototype.split`.
 * @function module:_stringOps.split
 * @param separator {String|RegExp}
 * @param str {String}
 * @returns {Array}
 */
var split = fPureTakesOne('split');

/**
 * Created by elydelacruz on 9/7/2017.
 * @module _jsPlatform_function
 * @private
 */
var apply = function apply(fn, args) {
    return fn.apply(null, args);
};
var call = function call(fn) {
    for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
    }

    return apply(fn, args);
};

/**
 * @module jsPlatform_
 * @private
 */

/**
 * @author elydelacruz
 * @created 12/6/2016.
 * @memberOf _functionOps
 * @description "Curry strict" and "curry arbitrarily" functions (`curry`, `curryN`).
 */
var notFnErrPrefix = '`fn` in `curry(fn, ...args)`';

var curry = function curry(fn) {
    for (var _len5 = arguments.length, argsToCurry = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        argsToCurry[_key5 - 1] = arguments[_key5];
    }

    return curryN.apply(undefined, [fnOrError(notFnErrPrefix, fn).length, fn].concat(argsToCurry));
};
var curryN = function curryN(executeArity, fn) {
    for (var _len6 = arguments.length, curriedArgs = Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
        curriedArgs[_key6 - 2] = arguments[_key6];
    }

    return function () {
        for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            args[_key7] = arguments[_key7];
        }

        var concatedArgs = concat(curriedArgs, args),
            canBeCalled = length(concatedArgs) >= executeArity || !executeArity;
        return !canBeCalled ? apply(curryN, concat([executeArity, fnOrError(notFnErrPrefix, fn)], concatedArgs)) : apply(fnOrError(notFnErrPrefix, fn), concatedArgs);
    };
};
var curry2 = function curry2(fn) {
    return curryN(2, fn);
};
/**
 * @memberOf _objectOps
 */

/**
 * Returns property value if found; Else `undefined`.
 * @function module:_objectOps.prop
 * @param name {String} - Key to search on `obj`
 * @param obj {Object} - Object to search `name` on.
 * @returns {*}
 */
var prop$1 = function prop$1(name, obj) {
    return obj[name];
};

var _Object = Object.name;
var _Function = Function.name;
var isFunction = function isFunction(value) {
    return instanceOf$1(Function, value);
};
var isType$1 = function isType$1(type, obj) {
    return typeOf(obj) === (isFunction(type) ? type.name : type);
};
var isObject = function isObject(value) {
    return isType$1(_Object, value);
};
var assignDeep$1 = function assignDeep$1(obj0) {
    for (var _len8 = arguments.length, objs = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
        objs[_key8 - 1] = arguments[_key8];
    }

    return objs.reduce(function (topAgg, obj) {
        return keys(obj).reduce(function (agg, key) {
            var propDescription = Object.getOwnPropertyDescriptor(agg, key);
            // If property is not writable move to next item in collection
            if (hasOwnProperty$1(key, agg) && propDescription && !(propDescription.get && propDescription.set) && !propDescription.writable) {
                return agg;
            }
            if (isObject(agg[key]) && isObject(obj[key])) {
                assignDeep$1(agg[key], obj[key]);
            } else {
                agg[key] = obj[key];
            }
            return agg;
        }, topAgg);
    }, obj0);
};

/**
 * @memberOf _functionOps
 */

var negateF = function negateF(fn) {
    return function (a, b) {
        return !fn(a, b);
    };
};
var negateF3 = function negateF3(fn) {
    return function (a, b, c) {
        return !fn(a, b, c);
    };
};
var negateP = negateF3;
var alwaysFalse = function alwaysFalse() {
    return false;
};

/**
 * @module _objectOps
 * @description Object operations (uncurried).
 * @private
 */

/**
 * @function module:_listOps.map
 * @param fn {Function} - Function to map on array.
 * @param xs {Array}
 * @returns {Array}
 */
function _map(fn, xs) {
    var ind = 0,
        limit = length(xs),
        out = [];
    if (!limit) {
        return out;
    }
    while (ind < limit) {
        out.push(fn(xs[ind], ind, xs));
        ind += 1;
    }
    return out;
}

var aggregateArr = function aggregateArr(agg, item) {
    agg.push(item);
    return agg;
};
/**
 * List operator utils module.
 * @module _listOpUtils
 * @private
 */
var sliceFrom = function sliceFrom(startInd, arr) {
    return slice(startInd, undefined, arr);
};
var sliceTo = function sliceTo(toInd, xs) {
    return slice(0, toInd, xs);
};
var copy = function copy(xs) {
    return sliceFrom(0, xs);
};
var genericAscOrdering = function genericAscOrdering(a, b) {
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    }
    return 0;
};
var lengths = function lengths() {
    for (var _len11 = arguments.length, lists = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        lists[_key11] = arguments[_key11];
    }

    return length(lists) ? _map(length, lists) : [];
};
var lengthsToSmallest = function lengthsToSmallest() {
    for (var _len12 = arguments.length, lists = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
        lists[_key12] = arguments[_key12];
    }

    var listLengths = apply(lengths, lists),
        smallLen = Math.min.apply(Math, listLengths);
    return _map(function (list, ind) {
        return listLengths[ind] > smallLen ? sliceTo(smallLen, list) : copy(list);
    }, lists);
};
var reduceUntil = function reduceUntil(pred, op, agg, arr) {
    var limit = length(arr);
    if (!limit) {
        return agg;
    }
    var ind = 0,
        result = agg;
    for (; ind < limit; ind++) {
        if (pred(arr[ind], ind, arr)) {
            break;
        }
        result = op(result, arr[ind], ind, arr);
    }
    return result;
};
var reduceRightUntil = function reduceRightUntil(pred, op, agg, arr) {
    var limit = length(arr);
    if (!limit) {
        return agg;
    }
    var ind = limit - 1,
        result = agg;
    for (; ind >= 0; ind--) {
        if (pred(arr[ind], ind, arr)) {
            break;
        }
        result = op(result, arr[ind], ind, arr);
    }
    return result;
};
var reduce$1 = function reduce$1(operation, agg, arr) {
    return reduceUntil(alwaysFalse, // until-predicate
    operation, // operation
    agg, // aggregator
    arr);
};
var reduceRight$1 = function reduceRight$1(operation, agg, arr) {
    return reduceRightUntil(alwaysFalse, // until-predicate
    operation, // operation
    agg, // aggregator
    arr);
};
var lastIndex = function lastIndex(x) {
    var len = length(x);return len ? len - 1 : 0;
};
var findIndexWhere = function findIndexWhere(pred, arr) {
    var ind = -1,
        predicateFulfilled = false;
    var limit = length(arr);
    while (ind < limit && !predicateFulfilled) {
        predicateFulfilled = pred(arr[++ind], ind, arr);
    }
    return ind;
};
var findIndexWhereRight = function findIndexWhereRight(pred, arr) {
    var limit = length(arr);
    var ind = limit,
        predicateFulfilled = false;
    for (; ind >= 0 && !predicateFulfilled; --ind) {
        predicateFulfilled = pred(arr[ind], ind, arr);
    }
    return ind;
};
var findIndicesWhere = function findIndicesWhere(pred, xs) {
    if (!xs || !xs.length) {
        return undefined;
    }
    var limit = length(xs);
    var ind = 0,
        out = [];
    for (; ind < limit; ind++) {
        if (pred(xs[ind], ind, xs)) {
            out.push(ind);
        }
    }
    return out.length ? out : undefined;
};
var findWhere = function findWhere(pred, xs) {
    var ind = 0,
        limit = length(xs);
    if (!limit) {
        return;
    }
    for (; ind < limit; ind++) {
        var elm = xs[ind];
        if (pred(elm, ind, xs)) {
            return elm;
        }
    }
};

/**
 * List operations module.
 * @module _listOps
 * @todo decide whether to throw errors where functions cannot function without a specific type or to return undefined (and also determine which cases are ok for just returning undefined).
 * @private
 */
// Exported internals
var _append = concat;
var _appendMany = function _appendMany() {
    for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
        args[_key13] = arguments[_key13];
    }

    if (length(args)) {
        return apply(concat, args);
    }
    throw new Error('`_appendMany` requires at least one arg.');
};
var _head = function _head(x) {
    return x[0];
};
var _last = function _last(xs) {
    return xs[lastIndex(xs)];
};
var _tail = function _tail(xs) {
    return sliceFrom(1, xs);
};
var _init = function _init(xs) {
    return sliceTo(lastIndex(xs), xs);
};
var _uncons = function _uncons(xs) {
    return !xs || length(xs) === 0 ? undefined : [_head(xs), _tail(xs)];
};
var _unconsr = function _unconsr(xs) {
    return !xs || length(xs) === 0 ? undefined : [_init(xs), _last(xs)];
};
var _concat = function _concat(xs) {
    return !length(xs) ? copy(xs) : apply(_appendMany, xs);
};
var _concatMap = function _concatMap(fn, foldableOfA) {
    return _concat(_map(fn, foldableOfA));
};
var _intersperse = function _intersperse(between, arr) {
    var limit = length(arr),
        lastInd = limit - 1,
        out = [];
    if (!limit) {
        return out;
    }
    return _foldl(function (agg, item, ind) {
        return ind === lastInd ? agg.push(item) : agg.push(item, between), agg;
    }, out, arr);
};
var _intercalate = function _intercalate(xs, xss) {
    return _concat(_intersperse(xs, xss));
};
var _foldl = reduce$1;
var _foldr = reduceRight$1;
var _foldl1 = function _foldl1(op, xs) {
    var parts = _uncons(xs);
    return !parts ? [] : reduce$1(op, parts[0], parts[1]);
};
var _foldr1 = function _foldr1(op, xs) {
    var parts = _unconsr(xs);
    return !parts ? [] : reduceRight$1(op, parts[1], parts[0]);
};
var _mapAccumL = function _mapAccumL(op, zero, xs) {
    var list = copy(xs),
        limit = length(xs);
    if (!limit) {
        return [zero, list];
    }
    var ind = 0,
        agg = zero,
        mapped = [],
        tuple = void 0;
    for (; ind < limit; ind++) {
        tuple = op(agg, list[ind], ind);
        agg = tuple[0];
        mapped = tuple[1];
    }
    return [agg, mapped];
};
var _mapAccumR = function _mapAccumR(op, zero, xs) {
    var list = copy(xs),
        limit = length(xs);
    if (!limit) {
        return [zero, list];
    }
    var ind = limit - 1,
        agg = zero,
        mapped = [],
        tuple = void 0;
    for (; ind >= 0; ind--) {
        tuple = op(agg, list[ind], ind);
        agg = tuple[0];
        mapped = tuple[1];
    }
    return [agg, mapped];
};
var _iterate = function _iterate(limit, op, x) {
    var ind = 0,
        out = [],
        lastX = x;
    for (; ind < limit; ind += 1) {
        out.push(lastX);
        lastX = op(lastX);
    }
    return out;
};
var _repeat = function _repeat(limit, x) {
    return _iterate(limit, function (a) {
        return a;
    }, x);
};
var _replicate = _repeat;
var _cycle = function _cycle(limit, xs) {
    return _concat(_replicate(limit, xs));
};
var _unfoldr = function _unfoldr(op, x) {
    var ind = 0,
        out = [],
        resultTuple = op(x, ind, out);
    while (resultTuple) {
        out.push(resultTuple[0]);
        resultTuple = op(resultTuple[1], ++ind, out);
    }
    return out;
};
var _findIndex = findIndexWhere;
var _findIndices = findIndicesWhere;
var _elemIndex = function _elemIndex(x, xs) {
    var foundInd = indexOf(x, xs);
    return foundInd !== -1 ? foundInd : undefined;
};
var _elemIndices = function _elemIndices(value, xs) {
    return _findIndices(function (x) {
        return x === value;
    }, xs);
};
var _take = function _take(limit, list) {
    return sliceTo(limit, list);
};
var _drop = function _drop(count, list) {
    return sliceFrom(count, list);
};
var _splitAt = function _splitAt(ind, list) {
    return [sliceTo(ind, list), sliceFrom(ind, list)];
};
var _takeWhile = function _takeWhile(pred, list) {
    return reduceUntil(negateP(pred), // predicate
    aggregateArr, // operation
    [], // aggregator
    list);
};
var _dropWhile = function _dropWhile(pred, list) {
    var limit = length(list),
        splitPoint = findIndexWhere(function (item, ind, list2) {
        return !pred(list[ind], ind, list2);
    }, list);

    return splitPoint === -1 ? sliceTo(limit, list) : slice(splitPoint, limit, list);
};
var _dropWhileEnd = function _dropWhileEnd(pred, list) {
    var limit = length(list),
        splitPoint = findIndexWhereRight(function (item, ind, list2) {
        return !pred(list[ind], ind, list2);
    }, list);

    return splitPoint === -1 ? sliceTo(limit, list) : sliceTo(splitPoint + 1, list);
};
var _span = function _span(pred, list) {
    var splitPoint = findIndexWhere(negateP(pred), list);
    return splitPoint === -1 ? _splitAt(0, list) : _splitAt(splitPoint, list);
};
var _breakOnList = function _breakOnList(pred, list) {
    var splitPoint = findIndexWhere(pred, list);
    return splitPoint === -1 ? _splitAt(0, list) : _splitAt(splitPoint, list);
};
var _at = prop$1;
var _find = findWhere;
var _filter = function _filter(pred, xs) {
    var ind = 0,
        limit = length(xs),
        out = [];
    if (!limit) {
        return out;
    }
    for (; ind < limit; ind++) {
        if (pred(xs[ind], ind, xs)) {
            out.push(xs[ind]);
        }
    }
    return out;
};
var _partition = function _partition(pred, list) {
    return !length(list) ? [[], []] : [_filter(pred, list), _filter(negateP(pred), list)];
};
var _elem = includes;
var _notElem = negateF(includes);
var _lookup = _at;
var _isPrefixOf = function _isPrefixOf(xs1, xs2) {
    var limit1 = length(xs1),
        limit2 = length(xs2);
    if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs1[0], xs2) === -1) {
        return false;
    }
    var ind = 0;
    for (; ind < limit1; ind++) {
        if (xs1[ind] !== xs2[ind]) {
            return false;
        }
    }
    return true;
};
var _isSuffixOf = function _isSuffixOf(xs1, xs2) {
    var limit1 = length(xs1),
        limit2 = length(xs2);
    if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs1[0], xs2) === -1) {
        return false;
    }
    var ind1 = limit1 - 1,
        ind2 = limit2 - 1;
    for (; ind1 >= 0; ind1--) {
        if (xs1[ind1] !== xs2[ind2]) {
            return false;
        }
        ind2 -= 1;
    }
    return true;
};
var _isInfixOf = function _isInfixOf(xs1, xs2) {
    var limit1 = length(xs1),
        limit2 = length(xs2);
    if (limit2 < limit1 || !limit1 || !limit2) {
        return false;
    }
    var ind1 = void 0,
        foundLen = void 0,
        ind = 0;
    for (; ind < limit2; ind += 1) {
        foundLen = 0;
        for (ind1 = 0; ind1 < limit1; ind1 += 1) {
            if (xs2[ind1 + ind] === xs1[ind1]) {
                foundLen += 1;
            }
            if (foundLen === limit1) {
                return true;
            }
        }
    }
    return false;
};
var _isSubsequenceOf = function _isSubsequenceOf(xs1, xs2) {
    var len = Math.pow(2, length(xs2)),
        lenXs1 = length(xs1);
    var foundLen = void 0,
        i = void 0;
    for (i = 0; i < len; i += 1) {
        foundLen = 0;
        for (var j = 0; j < len; j += 1) {
            if (i & 1 << j && indexOf(xs2[j], xs1) > -1) {
                foundLen += 1;
            }
            if (foundLen === lenXs1) {
                return true;
            }
        }
    }
    return false;
};
var _groupBy = function _groupBy(equalityOp, xs) {
    var limit = length(xs);
    if (!limit) {
        return copy(xs);
    }
    var ind = 0,
        prevItem = void 0,
        item = void 0,
        predOp = function predOp(x) {
        if (equalityOp(x, prevItem)) {
            ind++;
        }
        if (equalityOp(x, item)) {
            prevItem = x;
            return true;
        }
        return false;
    },
        agg = [];
    for (; ind < limit; ind += 1) {
        item = xs[ind];
        agg.push(_takeWhile(predOp, slice(ind, limit, xs)));
    }
    return agg;
};
var _stripPrefix = function _stripPrefix(prefix, list) {
    return _isPrefixOf(prefix, list) ? _splitAt(length(prefix), list)[1] : copy(list);
};
var _zip = function _zip(arr1, arr2) {
    if (!length(arr1) || !length(arr2)) {
        return [];
    }

    var _lengthsToSmallest = lengthsToSmallest(arr1, arr2),
        _lengthsToSmallest2 = slicedToArray(_lengthsToSmallest, 2),
        a1 = _lengthsToSmallest2[0],
        a2 = _lengthsToSmallest2[1];

    return reduce$1(function (agg, item, ind) {
        return aggregateArr(agg, [item, a2[ind]]);
    }, [], a1);
};
var _zipN = function _zipN() {
    for (var _len14 = arguments.length, lists = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
        lists[_key14] = arguments[_key14];
    }

    var trimmedLists = apply(lengthsToSmallest, _filter(length, lists)),
        lenOfTrimmed = length(trimmedLists);
    if (!lenOfTrimmed) {
        return [];
    } else if (lenOfTrimmed === 1) {
        return sliceTo(length(trimmedLists[0]), trimmedLists[0]);
    }
    return reduce$1(function (agg, item, ind) {
        return aggregateArr(agg, _map(function (xs) {
            return xs[ind];
        }, trimmedLists));
    }, [], trimmedLists[0]);
};
var _zip3 = function _zip3(arr1, arr2, arr3) {
    return _zipN(arr1, arr2, arr3);
};
var _zip4 = function _zip4(arr1, arr2, arr3, arr4) {
    return _zipN(arr1, arr2, arr3, arr4);
};
var _zip5 = function _zip5(arr1, arr2, arr3, arr4, arr5) {
    return _zipN(arr1, arr2, arr3, arr4, arr5);
};
var _zipWith = function _zipWith(op, xs1, xs2) {
    if (!length(xs1) || !length(xs2)) {
        return [];
    }

    var _lengthsToSmallest3 = lengthsToSmallest(xs1, xs2),
        _lengthsToSmallest4 = slicedToArray(_lengthsToSmallest3, 2),
        a1 = _lengthsToSmallest4[0],
        a2 = _lengthsToSmallest4[1];

    return reduce$1(function (agg, item, ind) {
        return aggregateArr(agg, op(item, a2[ind]));
    }, [], a1);
};
var _zipWithN = function _zipWithN(op) {
    for (var _len15 = arguments.length, lists = Array(_len15 > 1 ? _len15 - 1 : 0), _key15 = 1; _key15 < _len15; _key15++) {
        lists[_key15 - 1] = arguments[_key15];
    }

    var trimmedLists = apply(lengthsToSmallest, lists),
        lenOfTrimmed = length(trimmedLists);
    if (!lenOfTrimmed) {
        return [];
    } else if (lenOfTrimmed === 1) {
        return sliceTo(length(trimmedLists[0]), trimmedLists[0]);
    }
    return reduce$1(function (agg, item, ind) {
        return aggregateArr(agg, apply(op, _map(function (xs) {
            return xs[ind];
        }, trimmedLists)));
    }, [], trimmedLists[0]);
};
var _zipWith3 = function _zipWith3(op, xs1, xs2, xs3) {
    return _zipWithN(op, xs1, xs2, xs3);
};
var _zipWith4 = function _zipWith4(op, xs1, xs2, xs3, xs4) {
    return _zipWithN(op, xs1, xs2, xs3, xs4);
};
var _zipWith5 = function _zipWith5(op, xs1, xs2, xs3, xs4, xs5) {
    return _zipWithN(op, xs1, xs2, xs3, xs4, xs5);
};
var _any = function _any(p, xs) {
    var ind = 0,
        limit = length(xs);
    if (!limit) {
        return false;
    }
    for (; ind < limit; ind += 1) {
        if (p(xs[ind])) {
            return true;
        }
    }
    return false;
};
var _all = function _all(p, xs) {
    var limit = length(xs);
    var ind = 0;
    if (limit === 0) {
        return false;
    }
    for (; ind < limit; ind++) {
        if (!p(xs[ind], ind, xs)) {
            return false;
        }
    }
    return true;
};
var _scanl = function _scanl(fn, zero, xs) {
    if (!xs || !length(xs)) {
        return [];
    }
    var limit = length(xs);
    var ind = 0,
        result = zero,
        out = [];
    while (ind < limit) {
        result = fn(result, xs[ind], ind, xs);
        out.push(result);
        ind++;
    }
    return out;
};
var _scanl1 = function _scanl1(fn, xs) {
    if (!xs || !xs.length) {
        return [];
    }
    return _scanl(fn, _head(xs), _tail(xs));
};
var _scanr = function _scanr(fn, zero, xs) {
    if (!xs || !length(xs)) {
        return [];
    }
    var limit = length(xs);
    var ind = limit - 1,
        result = xs[0],
        out = [];
    while (ind > -1) {
        result = fn(result, xs[ind], ind, xs);
        out.push(result);
        ind--;
    }
    return out;
};
var _scanr1 = function _scanr1(fn, xs) {
    if (!xs || !xs.length) {
        return [];
    }
    return _scanr(fn, _last(xs), _init(xs));
};
var _remove = function _remove(x, list) {
    return _removeBy(function (a, b) {
        return a === b;
    }, x, list);
};
var _sortOn = function _sortOn(valueFn, xs) {
    return (

        // Un-decorate
        _map(function (decorated) {
            return decorated[1];
        },

        // Decorate and sort
        _sortBy(
        // Ordering
        function (_ref, _ref2) {
            var _ref4 = slicedToArray(_ref, 1),
                a0 = _ref4[0];

            var _ref3 = slicedToArray(_ref2, 1),
                b0 = _ref3[0];

            return genericAscOrdering(a0, b0);
        },

        // Decorate
        _map(function (item) {
            return [valueFn(item), item];
        }, xs)))
    );
};
var _sortBy = function _sortBy(orderingFn, xs) {
    return copy(xs).sort(orderingFn || genericAscOrdering);
};
var _insert = function _insert(x, xs) {
    if (!length(xs)) {
        return [x];
    }
    var foundIndex = _findIndex(function (item) {
        return x <= item;
    }, xs);
    return foundIndex === -1 ? [x] : _concat(_intersperse([x], _splitAt(foundIndex, xs)));
};
var _insertBy = function _insertBy(orderingFn, x, xs) {
    var limit = length(xs);
    if (!limit) {
        return [x];
    }
    var ind = 0;
    for (; ind < limit; ind += 1) {
        if (orderingFn(x, xs[ind]) <= 0) {
            var parts = _splitAt(ind, xs);
            return _concat([parts[0], [x], parts[1]]);
        }
    }
    return aggregateArr(copy(xs), x);
};
var _nubBy = function _nubBy(pred, list) {
    if (!length(list)) {
        return [];
    }
    var limit = length(list);
    var ind = 0,
        currItem = void 0,
        out = [],
        anyOp = function anyOp(storedItem) {
        return pred(currItem, storedItem);
    };
    for (; ind < limit; ind += 1) {
        currItem = list[ind];
        if (_any(anyOp, out)) {
            continue;
        }
        out.push(currItem);
    }
    return out;
};
var _removeBy = function _removeBy(pred, x, list) {
    // @todo optimize this implementation
    var foundIndex = _findIndex(function (item) {
        return pred(x, item);
    }, list),
        parts = _splitAt(foundIndex > -1 ? foundIndex : 0, list); // @todo correct this implementation
    return _append(parts[0], _tail(parts[1]));
};
var _removeFirstsBy = function _removeFirstsBy(pred, xs1, xs2) {
    return _foldl(function (agg, item) {
        return _removeBy(pred, item, agg);
    }, xs1, xs2);
};
var _unionBy = function _unionBy(pred, arr1, arr2) {
    return _foldl(function (agg, b) {
        var alreadyAdded = _any(function (a) {
            return pred(a, b);
        }, agg);
        return !alreadyAdded ? (agg.push(b), agg) : agg;
    }, copy(arr1), arr2);
};
var _union = function _union(arr1, arr2) {
    return _append(arr1, _filter(function (elm) {
        return !includes(elm, arr1);
    }, arr2));
};
var _intersect = function _intersect(arr1, arr2) {
    return !arr1 || !arr2 || !arr1 && !arr2 ? [] : _filter(function (elm) {
        return includes(elm, arr2);
    }, arr1);
};
var _intersectBy = function _intersectBy(pred, list1, list2) {
    return _foldl(function (agg, a) {
        return _any(function (b) {
            return pred(a, b);
        }, list2) ? (agg.push(a), agg) : agg;
    }, [], list1);
};
var _difference = function _difference(array1, array2) {
    // augment this with max length and min length ordering on op
    if (array1 && !array2) {
        return copy(array1);
    } else if (!array1 && array2 || !array1 && !array2) {
        return [];
    }
    return reduce$1(function (agg, elm) {
        return !includes(elm, array2) ? (agg.push(elm), agg) : agg;
    }, [], array1);
};
var _complement = function _complement(arr0) {
    for (var _len16 = arguments.length, arrays = Array(_len16 > 1 ? _len16 - 1 : 0), _key16 = 1; _key16 < _len16; _key16++) {
        arrays[_key16 - 1] = arguments[_key16];
    }

    return reduce$1(function (agg, arr) {
        return _append(agg, _difference(arr, arr0));
    }, [], arrays);
};

var objUnion$1 = function objUnion$1(obj1, obj2) {
    return assignDeep$1(obj1, obj2);
};
var objIntersect$1 = function objIntersect$1(obj1, obj2) {
    return _foldl(function (agg, key) {
        if (hasOwnProperty$1(key, obj2)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {}, keys(obj1));
};
var objDifference$1 = function objDifference$1(obj1, obj2) {
    return _foldl(function (agg, key) {
        if (!hasOwnProperty$1(key, obj2)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {}, keys(obj1));
};
var objComplement$1 = function objComplement$1(obj0) {
    for (var _len17 = arguments.length, objs = Array(_len17 > 1 ? _len17 - 1 : 0), _key17 = 1; _key17 < _len17; _key17++) {
        objs[_key17 - 1] = arguments[_key17];
    }

    return _foldl(function (agg, obj) {
        return assignDeep$1(agg, objDifference$1(obj, obj0));
    }, {}, objs);
};

/**
 * @module objectOps
 */
var prop$$1 = curry(prop$1);
var instanceOf$$1 = curry(instanceOf$1);
var hasOwnProperty$$1 = curry(hasOwnProperty$1);
var assign$$1 = curry2(assign$1);
var assignDeep$$1 = curry2(assignDeep$1);
var objUnion$$1 = curry(objUnion$1);
var objIntersect$$1 = curry(objIntersect$1);
var objDifference$$1 = curry(objDifference$1);
var objComplement$$1 = curry2(objComplement$1);
var isType$$1 = curry(isType$1);

/**
 * Returns whether a value is a function or not.
 * @function module:objectOps.isFunction
 * @param value {*}
 * @returns {Boolean}
 */

/**
 * Checks if `value` is an es2015 `class`.
 * @function module:objectOps.isClass
 * @param x {*}
 * @returns {boolean}
 */

/**
 * Returns a boolean depicting whether a value is callable or not.
 * @function module:objectOps.isCallable
 * @tentative
 * @private
 * @param x {*}
 * @returns {Boolean}
 */

/**
 * Checks if value is an array.
 * @function module:objectOps.isArray
 * @param value {*}
 * @returns {boolean}
 */

/**
 * Checks whether value is an object or not.
 * @function module:objectOps.isObject
 * @param value
 * @returns {Boolean}
 */

/**
 * Checks if value is a boolean.
 * @function module:objectOps.isBoolean
 * @param value {*}
 * @returns {Boolean}
 */

/**
 * Checks if value is a valid number (also checks if isNaN so that you don't have to).
 * @function module:objectOps.isNumber
 * @param value {*}
 * @returns {Boolean}
 */

/**
 * Checks whether value is a string or not.
 * @function module:objectOps.isString
 * @param value {*}
 * @returns {Boolean}
 */

/**
 * Checks whether value is of `Map` or not.
 * @function module:objectOps.isMap
 * @param value {*}
 * @returns {Boolean}
 */

/**
 * Checks whether value is of `Set` or not.
 * @function module:objectOps.isSet
 * @param value {*}
 * @returns {Boolean}
 */

/**
 * Checks whether value is of `WeakMap` or not.
 * @function module:objectOps.isWeakMap
 * @param value {*}
 * @returns {Boolean}
 */

/**
 * Checks whether value is of `WeakSet` or not.
 * @function module:objectOps.isWeakSet
 * @param value {*}
 * @returns {Boolean}
 */

/**
 * Checks if value is undefined.
 * @function module:objectOps.isUndefined
 * @param value {*}
 * @returns {Boolean}
 */

/**
 * Checks if value is null.
 * @function module:objectOps.isNull
 * @param value {*}
 * @returns {Boolean}
 */

/**
 * Checks if value is a `Symbol`.
 * @function module:objectOps.isSymbol
 * @param value {*}
 * @returns {Boolean}
 */

/**
 * @tentative
 * @private
 */

/**
 * Checks if given `x` is one of the four
 * "usable" immutable JS primitives; I.e.,
 *  One of [String, Boolean, Number, Symbol]
 * @function module:objectOps.isUsableImmutablePrimitive
 * @param x {*}
 * @returns {Boolean}
 */

/**
 * Checks if !length.
 * @function module:objectOps.isEmptyList
 * @param x {*}
 * @returns {Boolean}
 */

/**
 * Checks if object has own properties/enumerable-props or not.
 * @function module:objectOps.isEmptyObject
 * @param obj {*}
 * @returns {Boolean}
 */

/**
 * Checks if collection is empty or not (Map, WeakMap, WeakSet, Set etc.).
 * @function module:objectOps.isEmptyCollection
 * @param x {*}
 * @returns {Boolean}
 */

/**
 * Checks to see if passed in argument is empty.
 * @function module:objectOps.isEmpty
 * @param value {*} - Value to check.
 * @returns {Boolean}
 */

/**
 * Returns whether passed in values is defined and not null.
 * @function module:objectOps.isset
 * @param x {*}
 * @returns {Boolean}
 */

/**
 * Returns the constructor/class/type name of a value.
 * @note Returns 'NaN' if value is of type `Number` and value is `isNaN`.
 * @note Returns 'Undefined' if value is `undefined`
 * @note Returns 'Null' if value is `null`
 * For values that have no concrete constructors and/or casters
 * (null, NaN, and undefined) we returned normalized names for them ('Null', 'NaN', 'Number')
 * @function module:objectOps.typeOf
 * @param value {*}
 * @returns {string} - Constructor's name or derived name (in the case of `null`, `undefined`, or `NaN` (whose
 *  normalized names are 'Null', 'Undefined', 'NaN' respectively).
 */

/**
 * Creates a value `of` given type;  Checks for one of the following construction strategies (in order listed):
 * - If exists `(value).constructor.of` uses this.
 * - If value is of one String, Boolean, Symbol, or Number types calls it's constructor as a function (in cast form;  E.g., `constructor(...args)` )
 * - Else if constructor is a function, thus far, then calls constructor using the `new` keyword (with any passed in args).
 * @function module:objectOps.of
 * @param x {*} - Value to derive returned value's type from.
 * @param [args] {...*} - Any args to pass in to matched construction strategy.
 * @returns {*|undefined} - New value of given value's type else `undefined`.
 */

/**
 * @function module:objectOps.length
 * @param x {*}
 * @returns {Number}
 * @throws {Error} - Throws an error if value doesn't have a `length` property (
 *  `null`, `undefined`, {Boolean}, Symbol, et. al.).
 */

/**
 * Gets own enumerable keys of passed in object (same as `Object.keys`).
 * @function module:objectOps.keys
 * @param obj {*}
 * @returns {Array<String>}
 */

var until$1 = function until$1(predicate, operation, typeInstance) {
    var result = typeInstance;
    while (!predicate(result)) {
        result = operation(result);
    }
    return result;
};

/**
 * @memberOf _functionOps
 * @author elydelacruz
 * @created 12/6/2016.
 * @description Curry implementation with place holder concept (`__`).
 * @todo Make code here more minimal (reuse small parts here).
 */

/**
 * PlaceHolder (__) constructor.
 * @constructor PlaceHolder
 * @private
 */
var PlaceHolder = function PlaceHolder() {};
var placeHolderInstance = new PlaceHolder();

/**
 * Place holder object (frozen) used by curry.
 * @memberOf _functionOps
 * @type {PlaceHolder}
 */
var __ = Object.freeze ? Object.freeze(placeHolderInstance) : placeHolderInstance;
/**
 * @memberOf _functionOps
 */

/**
 * Returns passed in parameter.
 * @haskellType `id :: a -> a`
 * @function module:_functionOps.id
 * @param x {*}
 * @returns {*}
 */
var id = function id(x) {
    return x;
};

/**
 * Function operations: `
 * @module functionOps
 */

var apply$1 = curry(apply);
var call$1 = curry2(call);
var until$$1 = curry(until$1);
var fPureTakesOneOrMore_ = function fPureTakesOneOrMore_(name) {
    return curry2(function (f) {
        for (var _len24 = arguments.length, args = Array(_len24 > 1 ? _len24 - 1 : 0), _key24 = 1; _key24 < _len24; _key24++) {
            args[_key24 - 1] = arguments[_key24];
        }

        return f[name].apply(f, args);
    });
};

/**
 * Created by elyde on 7/20/2017.
 * Curried functional versions of common array methods (`filter`, `map`, etc.).
 * @module jsPlatform_array
 * @private
 */

var push$1 = fPureTakesOneOrMore_('push');

/**
 * List operations that overlap (apart from globally overlapping props and functions like `length`)
 * on both strings and arrays.
 * @module jsPlatform_list
 * @private
 */

var slice$1 = curry(slice);
var includes$1 = curry(includes);
var indexOf$1 = curry(indexOf);
var lastIndexOf$1 = curry(lastIndexOf);

/**
 * Created by elydelacruz on 9/6/2017.
 * @module jsPlatform_string
 * @private
 */

/**
 * Functional version of `String.prototype.split`.
 * @curried
 * @function module:jsPlatform_string.split
 * @param separator {String|RegExp}
 * @param str {String}
 * @returns {Array}
 */
var split$1 = curry(split);

/**
 * @module jsPlatform
 * @private
 */

/**
 * List operators.
 * @module listOps
 * @todo decide whether to throw errors where functions cannot function without a specific type or to
 *  return undefined (and also determine which cases are ok for just returning undefined).
 */
var append = curry(_append);
var appendMany = curry2(_appendMany);
var concatMap = curry2(_concatMap);
var map$1 = curry(_map);
var intersperse = curry(_intersperse);
var intercalate = curry(_intercalate);
var foldl = curry(_foldl);
var foldr = curry(_foldr);
var foldl1 = curry(_foldl1);
var foldr1 = curry(_foldr1);
var mapAccumL = curry(_mapAccumL);
var mapAccumR = curry(_mapAccumR);
var iterate = curry(_iterate);
var repeat = curry(_repeat);
var replicate = curry(_replicate);
var cycle = curry(_cycle);
var unfoldr = curry(_unfoldr);
var findIndex = curry(_findIndex);
var findIndices = curry(_findIndices);
var elemIndex = curry(_elemIndex);
var elemIndices = curry(_elemIndices);
var take = curry(_take);
var drop = curry(_drop);
var splitAt = curry(_splitAt);
var takeWhile = curry(_takeWhile);
var dropWhile = curry(_dropWhile);
var dropWhileEnd = curry(_dropWhileEnd);
var span = curry(_span);
var breakOnList = curry(_breakOnList);
var at = curry(_at);
var find = curry(_find);
var filter$1 = curry(_filter);
var partition = curry(_partition);
var elem = curry(_elem);
var notElem = curry2(_notElem);
var lookup = curry(_lookup);
var isPrefixOf = curry(_isPrefixOf);
var isSuffixOf = curry(_isSuffixOf);
var isInfixOf = curry(_isInfixOf);
var isSubsequenceOf = curry(_isSubsequenceOf);
var groupBy = curry(_groupBy);
var stripPrefix = curry(_stripPrefix);
var zip = curry(_zip);
var zip3 = curry(_zip3);
var zip4 = curry(_zip4);
var zip5 = curry(_zip5);
var zipWith = curry(_zipWith);
var zipWithN = curry(_zipWithN);
var zipWith3 = curry(_zipWith3);
var zipWith4 = curry(_zipWith4);
var zipWith5 = curry(_zipWith5);
var any = curry(_any);
var all = curry(_all);
var scanl = curry(_scanl);
var scanl1 = curry(_scanl1);
var scanr = curry(_scanr);
var scanr1 = curry(_scanr1);
var remove = curry(_remove);
var sortOn = curry(_sortOn);
var sortBy = curry(_sortBy);
var insert = curry(_insert);
var insertBy = curry(_insertBy);
var nubBy = curry(_nubBy);
var removeBy = curry(_removeBy);
var removeFirstsBy = curry(_removeFirstsBy);
var unionBy = curry(_unionBy);
var union = curry(_union);
var intersect = curry(_intersect);
var intersectBy = curry(_intersectBy);
var difference = curry(_difference);
var complement = curry2(_complement);

/**
 * Contains functions for operating strings.
 * @author elyde
 * @created 7/9/2017.
 * @module stringOps
 */
var lines = split$1(/[\n\r]/gm);
var words = split$1(/[\s\t]/gm);
var unwords = intercalate(' ');
var unlines = intercalate('\n');

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
    return isFunction(x) ? x : function () {
        return x;
    };
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
var fmap = curry(function (fn, x) {
    return x.map(fn);
});
var ap = curry(function (applicative, functor) {
    return applicative.ap(functor);
});
var flatMap = curry(function (fn, monad) {
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
        value: function of$$1(x) {
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

var Pos = function Pos(x, y) {
    classCallCheck(this, Pos);

    this.x = x;
    this.y = y;
};

var Pointer = function () {
    function Pointer(board, pos) {
        classCallCheck(this, Pointer);

        this.board = board;
        this.pos = pos;
    }

    createClass(Pointer, [{
        key: 'updatePos',
        value: function updatePos(pos) {
            return new Pointer(this.board, pos);
        }
    }, {
        key: 'extract',
        value: function extract() {
            return this.board[this.pos.x][this.pos.y];
        }
    }, {
        key: 'extend',
        value: function extend(f) {
            var board = [],
                x = void 0,
                y = void 0;
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

var SIZE = 100;
var SCALE = 8;
var posInBounds = function posInBounds(pos) {
    return pos.x >= 0 && pos.y >= 0 && pos.x < SIZE && pos.y < SIZE;
};
var pointerNeighbours = function pointerNeighbours(pointer) {
    var offsets = [new Pos(-1, -1), new Pos(-1, 0), new Pos(-1, 1), new Pos(0, -1), new Pos(0, 1), new Pos(1, -1), new Pos(1, 0), new Pos(1, 1)],
        positions = filter$1(map$1(function (offset) {
        return new Pos(pointer.pos.x + offset.x, pointer.pos.y + offset.y);
    }, offsets), posInBounds);
    return map$1(function (pos) {
        return pointer.updatePos(pos).extract();
    }, positions);
};
var liveNeighbours = function liveNeighbours(pointer) {
    return length(filter$1(id, pointerNeighbours(pointer)));
};
var rules = function rules(pointer) {
    var c = pointer.extract(),
        n = liveNeighbours(pointer);

    return c && (n < 2 || n > 3) ? false : c && n === 2 || n === 3 || c;
};
var step = function step(board) {
    return new Pointer(board, new Pos(0, 0)).extend(rules).board;
};
var generateBoard = function generateBoard() {
    return IO.of(function () {
        var board = [],
            x = void 0,
            y = void 0;
        for (x = 0; x < SIZE; x++) {
            board[x] = [];
            for (y = 0; y < SIZE; y++) {
                board[x][y] = Math.random() > 0.5;
            }
        }
        return board;
    });
};
var drawBoard = function drawBoard(canvas, board) {
    return IO.of(function () {
        var x = void 0,
            y = void 0;
        for (x = 0; x < board.length; x++) {
            for (y = 0; y < board[x].length; y++) {
                if (board[x][y]) {
                    canvas.fillRect(x, y, 1, 1);
                } else {
                    canvas.clearRect(x, y, 1, 1);
                }
            }
        }
    });
};
var loop = function loop(canvas, board) {
    return drawBoard(canvas, board).flatMap(function () {
        return loop(canvas, step(board)).fork();
    });
};
var main = function main() {
    var element = document.getElementById('game-of-comonads'),
        canvas = element.getContext('2d');

    return IO.of(function () {
        element.width = SIZE * SCALE;
        element.height = SIZE * SCALE;
        canvas.scale(SCALE, SCALE);
    }).flatMap(generateBoard).flatMap(loop)

    // Perform effects!
    .unsafePerformIO(); // Could also call `do` here (instead)
};

window.addEventListener('load', main);

}());
//# sourceMappingURL=index.js.map
