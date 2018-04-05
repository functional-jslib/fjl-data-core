(function () {
'use strict';

/**
 * Created by elyde on 12/18/2016.
 * @memberOf _objectOps
 */
const _Number = Number.name;
const _NaN = 'NaN';
const _Null = 'Null';
const _Undefined = 'Undefined';

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
function typeOf (value) {
    let retVal;
    if (value === undefined) {
        retVal = _Undefined;
    }
    else if (value === null) {
        retVal = _Null;
    }
    else {
        let constructorName = (value).constructor.name;
        retVal = constructorName === _Number && isNaN(value) ?
            _NaN : constructorName;
    }
    return retVal;
}

const fPureTakesOne = name => (arg, f) => f[name](arg);
const fPureTakes2 = name => (arg1, arg2, f) => f[name](arg1, arg2);
const fPureTakesOneOrMore = name => (f, ...args) => f[name](...args);
const fnOrError = (symbolName, f) => {
        if (!f || f.constructor !== Function) {
            throw new Error (`${symbolName} should be a function. ` +
                `Type received: ${typeOf(f)};  Value received: ${f}.`);
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

const instanceOf$1 = (instanceConstructor, instance) =>
        instance instanceof instanceConstructor;
const hasOwnProperty$1 = fPureTakesOne('hasOwnProperty');
const length = x => x.length;
const keys = obj => Object.keys(obj);
/**
 *  List operations that overlap (apart from globally overlapping props and functions like `length`)
 *      on both strings and arrays.
 */

const concat = fPureTakesOneOrMore('concat');
const slice = fPureTakes2('slice');
const includes = (() => 'includes' in Array.prototype ?
            fPureTakesOne('includes') :
            (value, xs) => xs.indexOf(value) > -1)();
const indexOf = fPureTakesOne('indexOf');
const lastIndexOf = fPureTakesOne('lastIndexOf');

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
const split = fPureTakesOne('split');

/**
 * Created by elydelacruz on 9/7/2017.
 * @module _jsPlatform_function
 * @private
 */
const apply = (fn, args) => fn.apply(null, args);
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
const notFnErrPrefix = '`fn` in `curry(fn, ...args)`';

const curry = (fn, ...argsToCurry) => curryN(fnOrError(notFnErrPrefix, fn).length, fn, ...argsToCurry);
const curryN = (executeArity, fn, ...curriedArgs) => {
        return (...args) => {
            let concatedArgs = concat(curriedArgs, args),
                canBeCalled = (length(concatedArgs) >= executeArity) || !executeArity;
            return !canBeCalled ? apply(curryN, concat([executeArity, fnOrError(notFnErrPrefix, fn)], concatedArgs)) :
                apply(fnOrError(notFnErrPrefix, fn), concatedArgs);
        };
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
const prop$1 = (name, obj) => obj[name];

let _Object = Object.name;
let _Function = Function.name;
const isFunction = value => instanceOf$1(Function, value);
const isType$1 = (type, obj) => typeOf(obj) === (isFunction(type) ? type.name : type);
const isObject = value => isType$1(_Object, value);
const isset = x => x !== null && x !== undefined;

const assignDeep$1 = (obj0, ...objs) =>
        objs.reduce((topAgg, obj) =>
                keys(obj).reduce((agg, key) => {
                    let propDescription = Object.getOwnPropertyDescriptor(agg, key);
                    // If property is not writable move to next item in collection
                    if (hasOwnProperty$1(key, agg) && propDescription &&
                        !(propDescription.get && propDescription.set) &&
                        !propDescription.writable) {
                        return agg;
                    }
                    if (isObject(agg[key]) && isObject(obj[key])) {
                        assignDeep$1(agg[key], obj[key]);
                    }
                    else { agg[key] = obj[key]; }
                    return agg;
                }, topAgg)
            , obj0);

const negateF3 = fn => (a, b, c) => !fn(a, b, c);
const negateP = negateF3;
const alwaysFalse = () => false;

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
function _map (fn, xs) {
    let ind = 0,
        limit = length(xs),
        out = [];
    if (!limit) { return out; }
    while (ind < limit) {
        out.push(fn(xs[ind], ind, xs));
        ind += 1;
    }
    return out;
}

const aggregateArr = (agg, item) => {
        agg.push(item);
        return agg;
    };
/**
 * List operator utils module.
 * @module _listOpUtils
 * @private
 */
const sliceFrom = (startInd, arr) => slice(startInd, undefined, arr);
const sliceTo = (toInd, xs) => slice(0, toInd, xs);
const copy = xs => sliceFrom(0, xs);
const genericAscOrdering = (a, b) => {
        if (a > b) { return 1; }
        else if (a < b) { return -1; }
        return 0;
    };
const lengths = (...lists) => length(lists) ? _map(length, lists) : [];
const lengthsToSmallest = (...lists) => {
        const listLengths = apply(lengths, lists),
            smallLen = Math.min.apply(Math, listLengths);
        return _map((list, ind) => listLengths[ind] > smallLen ?
            sliceTo(smallLen, list) : copy(list), lists);
    };
const reduceUntil = (pred, op, agg, arr) => {
        const limit = length(arr);
        if (!limit) { return agg; }
        let ind = 0,
            result = agg;
        for (; ind < limit; ind++) {
            if (pred(arr[ind], ind, arr)) { break; }
            result = op(result, arr[ind], ind, arr);
        }
        return result;
    };
const reduceRightUntil = (pred, op, agg, arr) => {
        const limit = length(arr);
        if (!limit) { return agg; }
        let ind = limit - 1,
            result = agg;
        for (; ind >= 0; ind--) {
            if (pred(arr[ind], ind, arr)) { break; }
            result = op(result, arr[ind], ind, arr);
        }
        return result;
    };
const reduce$1 = (operation, agg, arr) =>
        reduceUntil(
            alwaysFalse,            // until-predicate
            operation,              // operation
            agg,                    // aggregator
            arr);
const reduceRight$1 = (operation, agg, arr) =>
        reduceRightUntil(
            alwaysFalse,            // until-predicate
            operation,              // operation
            agg,                    // aggregator
            arr);
const lastIndex = x => { const len = length(x); return len ? len - 1 : 0; };
const findIndexWhere = (pred, arr) => {
        let ind = -1,
            predicateFulfilled = false;
        const limit = length(arr);
        while (ind < limit && !predicateFulfilled) {
            predicateFulfilled = pred(arr[++ind], ind, arr);
        }
        return ind;
    };
const findIndexWhereRight = (pred, arr) => {
        const limit = length(arr);
        let ind = limit,
            predicateFulfilled = false;
        for (; ind >= 0 && !predicateFulfilled; --ind) {
            predicateFulfilled = pred(arr[ind], ind, arr);
        }
        return ind;
    };
const findIndicesWhere = (pred, xs) => {
        if (!xs || !xs.length) { return undefined; }
        const limit = length(xs);
        let ind = 0,
            out = [];
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) { out.push(ind); }
        }
        return out.length ? out : undefined;
    };
const findWhere = (pred, xs) => {
        let ind = 0,
            limit = length(xs);
        if (!limit) { return; }
        for (; ind < limit; ind++) {
            let elm = xs[ind];
            if (pred(elm, ind, xs)) { return elm; }
        }
    };

/**
 * List operations module.
 * @module _listOps
 * @todo decide whether to throw errors where functions cannot function without a specific type or to return undefined (and also determine which cases are ok for just returning undefined).
 * @private
 */
// Exported internals
const _append = concat;
const _appendMany = (...args) => {
        if (length(args)) { return apply(concat, args); }
        throw new Error('`_appendMany` requires at least one arg.');
    };
const _head = x => x[0];
const _last = xs => xs[lastIndex(xs)];
const _tail = xs => sliceFrom(1, xs);
const _init = xs => sliceTo(lastIndex(xs), xs);
const _uncons = xs =>
        !xs || length(xs) === 0 ? undefined : [_head(xs), _tail(xs)];
const _unconsr = xs => !xs || length(xs) === 0 ? undefined : [_init(xs), _last(xs)];
const _concat = xs => !length(xs) ? copy(xs) : apply(_appendMany, xs);
const _intersperse = (between, arr) => {
        const limit = length(arr),
            lastInd = limit - 1,
            out = [];
        if (!limit) {
            return out;
        }
        return _foldl((agg, item, ind) => (
                ind === lastInd ?
                    agg.push(item) :
                    agg.push(item, between), agg), out, arr);
    };
const _intercalate = (xs, xss) => _concat(_intersperse(xs, xss));
const _foldl = reduce$1;
const _foldr = reduceRight$1;
const _foldl1 = (op, xs) => {
        const parts = _uncons(xs);
        return !parts ? [] : reduce$1(op, parts[0], parts[1]);
    };
const _foldr1 = (op, xs) => {
        const parts = _unconsr(xs);
        return !parts ? [] : reduceRight$1(op, parts[1], parts[0]);
    };
const _mapAccumL = (op, zero, xs) => {
        const list = copy(xs),
            limit = length(xs);
        if (!limit) {
            return [zero, list];
        }
        let ind = 0,
            agg = zero,
            mapped = [],
            tuple;
        for (; ind < limit; ind++) {
            tuple = op(agg, list[ind], ind);
            agg = tuple[0];
            mapped = tuple[1];
        }
        return [agg, mapped];
    };
const _mapAccumR = (op, zero, xs) => {
        const list = copy(xs),
            limit = length(xs);
        if (!limit) {
            return [zero, list];
        }
        let ind = limit - 1,
            agg = zero,
            mapped = [],
            tuple;
        for (; ind >= 0; ind--) {
            tuple = op(agg, list[ind], ind);
            agg = tuple[0];
            mapped = tuple[1];
        }
        return [agg, mapped];
    };
const _iterate = (limit, op, x) => {
        let ind = 0,
            out = [],
            lastX = x;
        for (; ind < limit; ind += 1) {
            out.push(lastX);
            lastX = op(lastX);
        }
        return out;
    };
const _repeat = (limit, x) => _iterate(limit, a => a, x);
const _replicate = _repeat;
const _cycle = (limit, xs) => _concat(_replicate(limit, xs));
const _unfoldr = (op, x) => {
        let ind = 0,
            out = [],
            resultTuple = op(x, ind, out);
        while (resultTuple) {
            out.push(resultTuple[0]);
            resultTuple = op(resultTuple[1], ++ind, out);
        }
        return out;
    };
const _findIndex = findIndexWhere;
const _findIndices = findIndicesWhere;
const _elemIndex = (x, xs) => {
        const foundInd = indexOf(x, xs);
        return foundInd !== -1 ? foundInd : undefined;
    };
const _elemIndices = (value, xs) => _findIndices(x => x === value, xs);
const _take = (limit, list) => sliceTo(limit, list);
const _drop = (count, list) => sliceFrom(count, list);
const _splitAt = (ind, list) => [ sliceTo(ind, list), sliceFrom(ind, list) ];
const _takeWhile = (pred, list) =>
        reduceUntil(
            negateP(pred),  // predicate
            aggregateArr,   // operation
            [],             // aggregator
            list
        );
const _dropWhile = (pred, list) => {
        const limit = length(list),
            splitPoint =
                findIndexWhere((item, ind, list2) =>
                    !pred(list[ind], ind, list2), list);

        return splitPoint === -1 ?
            sliceTo(limit, list) :
            slice(splitPoint, limit, list);
    };
const _dropWhileEnd = (pred, list) => {
        const limit = length(list),
            splitPoint =
                findIndexWhereRight((item, ind, list2) =>
                    !pred(list[ind], ind, list2), list);

        return splitPoint === -1 ?
            sliceTo(limit, list) :
            sliceTo(splitPoint + 1, list);
    };
const _span = (pred, list) => {
        const splitPoint = findIndexWhere(negateP(pred), list);
        return splitPoint === -1 ?
            _splitAt(0, list) : _splitAt(splitPoint, list);
    };
const _breakOnList = (pred, list) => {
        const splitPoint = findIndexWhere(pred, list);
        return splitPoint === -1 ?
            _splitAt(0, list) : _splitAt(splitPoint, list);
    };
const _at = prop$1;
const _find = findWhere;
const _filter = (pred, xs) => {
        let ind = 0,
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
const _partition = (pred, list) =>
        !length(list) ?
            [[], []] :
                [_filter(pred, list), _filter(negateP(pred), list)];
const _elem = includes;
const _lookup = _at;
const _isPrefixOf = (xs1, xs2) => {
        const limit1 = length(xs1),
            limit2 = length(xs2);
        if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs1[0], xs2) === -1) {
            return false;
        }
        let ind = 0;
        for (; ind < limit1; ind++) {
            if (xs1[ind] !== xs2[ind]) {
                return false;
            }
        }
        return true;
    };
const _isSuffixOf = (xs1, xs2) => {
        const limit1 = length(xs1),
            limit2 = length(xs2);
        if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs1[0], xs2) === -1) {
            return false;
        }
        let ind1 = limit1 - 1,
            ind2 = limit2 - 1;
        for (; ind1 >= 0; ind1--) {
            if (xs1[ind1] !== xs2[ind2]) {
                return false;
            }
            ind2 -= 1;
        }
        return true;
    };
const _isInfixOf = (xs1, xs2) => {
        const limit1 = length(xs1),
            limit2 = length(xs2);
        if (limit2 < limit1 || !limit1 || !limit2) {
            return false;
        }
        let ind1,
            foundLen,
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
const _isSubsequenceOf = (xs1, xs2) => {
        const len = Math.pow(2, length(xs2)),
            lenXs1 = length(xs1);
        let foundLen,
            i;
        for (i = 0; i < len; i += 1) {
            foundLen = 0;
            for (let j = 0; j < len; j += 1) {
                if (i & (1 << j) && indexOf(xs2[j], xs1) > -1) {
                    foundLen += 1;
                }
                if (foundLen === lenXs1) {
                    return true;
                }
            }
        }
        return false;
    };
const _groupBy = (equalityOp, xs) => {
        const limit = length(xs);
        if (!limit) {
            return copy(xs);
        }
        let ind = 0,
            prevItem,
            item,
            predOp = x => {
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
const _stripPrefix = (prefix, list) =>
        _isPrefixOf(prefix, list) ?
            _splitAt(length(prefix), list)[1] :
            copy(list);
const _zip = (arr1, arr2) => {
        if (!length(arr1) || !length(arr2)) {
            return [];
        }
        const [a1, a2] = lengthsToSmallest(arr1, arr2);
        return reduce$1((agg, item, ind) =>
                aggregateArr(agg, [item, a2[ind]]),
            [], a1);
    };
const _zipN = (...lists) => {
        const trimmedLists = apply(lengthsToSmallest, _filter(length, lists)),
            lenOfTrimmed = length(trimmedLists);
        if (!lenOfTrimmed) {
            return [];
        }
        else if (lenOfTrimmed === 1) {
            return sliceTo(length(trimmedLists[0]), trimmedLists[0]);
        }
        return reduce$1((agg, item, ind) =>
                aggregateArr(agg, _map(xs => xs[ind], trimmedLists)),
            [], trimmedLists[0]);
    };
const _zip3 = (arr1, arr2, arr3) => _zipN(arr1, arr2, arr3);
const _zip4 = (arr1, arr2, arr3, arr4) => _zipN(arr1, arr2, arr3, arr4);
const _zip5 = (arr1, arr2, arr3, arr4, arr5) => _zipN(arr1, arr2, arr3, arr4, arr5);
const _zipWith = (op, xs1, xs2) => {
        if (!length(xs1) || !length(xs2)) {
            return [];
        }
        const [a1, a2] = lengthsToSmallest(xs1, xs2);
        return reduce$1((agg, item, ind) =>
                aggregateArr(agg, op(item, a2[ind])),
            [], a1);
    };
const _zipWithN = (op, ...lists) => {
        const trimmedLists = apply(lengthsToSmallest, lists),
            lenOfTrimmed = length(trimmedLists);
        if (!lenOfTrimmed) {
            return [];
        }
        else if (lenOfTrimmed === 1) {
            return sliceTo(length(trimmedLists[0]), trimmedLists[0]);
        }
        return reduce$1((agg, item, ind) =>
                aggregateArr(agg, apply(op, _map(xs => xs[ind], trimmedLists))),
            [], trimmedLists[0]);
    };
const _zipWith3 = (op, xs1, xs2, xs3) => _zipWithN(op, xs1, xs2, xs3);
const _zipWith4 = (op, xs1, xs2, xs3, xs4) => _zipWithN(op, xs1, xs2, xs3, xs4);
const _zipWith5 = (op, xs1, xs2, xs3, xs4, xs5) => _zipWithN(op, xs1, xs2, xs3, xs4, xs5);
const _any = (p, xs) => {
        let ind = 0,
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
const _all = (p, xs) => {
        const limit = length(xs);
        let ind = 0;
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
const _scanl = (fn, zero, xs) => {
        if (!xs || !length(xs)) {
            return [];
        }
        const limit = length(xs);
        let ind = 0,
            result = zero,
            out = [];
        while (ind < limit) {
            result = fn(result, xs[ind], ind, xs);
            out.push(result);
            ind++;
        }
        return out;
    };
const _scanl1 = (fn, xs) => {
        if (!xs || !xs.length) { return []; }
        return _scanl(fn, _head(xs), _tail(xs));
    };
const _scanr = (fn, zero, xs) => {
        if (!xs || !length(xs)) {
            return [];
        }
        const limit = length(xs);
        let ind = limit - 1,
            result = xs[0],
            out = [];
        while (ind > -1) {
            result = fn(result, xs[ind], ind, xs);
            out.push(result);
            ind--;
        }
        return out;
    };
const _scanr1 = (fn, xs) => {
        if (!xs || !xs.length) { return []; }
        return _scanr(fn, _last(xs), _init(xs));
    };
const _remove = (x, list) => _removeBy((a, b) => a === b, x, list);
const _sortOn = (valueFn, xs) =>

        // Un-decorate
        _map(decorated => decorated[1],

            // Decorate and sort
            _sortBy(
                // Ordering
                ([a0], [b0]) => genericAscOrdering(a0, b0),

                // Decorate
                _map(item => [valueFn(item), item], xs)
            )
        );
const _sortBy = (orderingFn, xs) => copy(xs).sort(orderingFn || genericAscOrdering);
const _insert = (x, xs) => {
        if (!length(xs)) {
            return [x];
        }
        const foundIndex = _findIndex(item => x <= item, xs);
        return foundIndex === -1 ? [x] :
            _concat(_intersperse([x], _splitAt(foundIndex, xs)));
    };
const _insertBy = (orderingFn, x, xs) => {
        const limit = length(xs);
        if (!limit) {
            return [x];
        }
        let ind = 0;
        for (; ind < limit; ind += 1) {
            if (orderingFn(x, xs[ind]) <= 0) {
                const parts = _splitAt(ind, xs);
                return _concat([parts[0], [x], parts[1]]);
            }
        }
        return aggregateArr(copy(xs), x);
    };
const _nubBy = (pred, list) => {
        if (!length(list)) {
            return [];
        }
        const limit = length(list);
        let ind = 0,
            currItem,
            out = [],
            anyOp = storedItem => pred(currItem, storedItem);
        for (; ind < limit; ind += 1) {
            currItem = list[ind];
            if (_any(anyOp, out)) {
                continue;
            }
            out.push(currItem);
        }
        return out;
    };
const _removeBy = (pred, x, list) => { // @todo optimize this implementation
        const foundIndex = _findIndex(item => pred(x, item), list),
            parts = _splitAt(foundIndex > -1 ? foundIndex : 0, list); // @todo correct this implementation
        return _append(parts[0], _tail(parts[1]));
    };
const _removeFirstsBy = (pred, xs1, xs2) =>
        _foldl((agg, item) => _removeBy(pred, item, agg), xs1, xs2);
const _unionBy = (pred, arr1, arr2) =>
        _foldl((agg, b) => {
                const alreadyAdded = _any(a => pred(a, b), agg);
                return !alreadyAdded ? (agg.push(b), agg) : agg;
            }, copy(arr1), arr2
        );
const _union = (arr1, arr2) =>
        _append(arr1,
            _filter(elm => !includes(elm, arr1), arr2));
const _intersect = (arr1, arr2) =>
        !arr1 || !arr2 || (!arr1 && !arr2) ? [] :
            _filter(elm => includes(elm, arr2), arr1);
const _intersectBy = (pred, list1, list2) =>
        _foldl((agg, a) =>
                _any(b => pred(a, b), list2) ? (agg.push(a), agg) : agg
            , [], list1);
const _difference = (array1, array2) => { // augment this with max length and min length ordering on op
        if (array1 && !array2) {
            return copy(array1);
        }
        else if (!array1 && array2 || (!array1 && !array2)) {
            return [];
        }
        return reduce$1((agg, elm) =>
                !includes(elm, array2) ? (agg.push(elm), agg) : agg
            , [], array1);
    };
const objUnion$1 = (obj1, obj2) => assignDeep$1(obj1, obj2);
const objIntersect$1 = (obj1, obj2) => _foldl((agg, key) => {
        if (hasOwnProperty$1(key, obj2)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {}, keys(obj1));
const objDifference$1 = (obj1, obj2) => _foldl((agg, key) => {
        if (!hasOwnProperty$1(key, obj2)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {}, keys(obj1));
/**
 * @module objectOps
 */
const prop$$1 = curry(prop$1);
const instanceOf$$1 = curry(instanceOf$1);
const hasOwnProperty$$1 = curry(hasOwnProperty$1);
const objUnion$$1 = curry(objUnion$1);
const objIntersect$$1 = curry(objIntersect$1);
const objDifference$$1 = curry(objDifference$1);
const isType$$1 = curry(isType$1);

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

const until$1 = (predicate, operation, typeInstance) => {
        let result = typeInstance;
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
const PlaceHolder = function PlaceHolder() {};
const placeHolderInstance = new PlaceHolder();

/**
 * Place holder object (frozen) used by curry.
 * @memberOf _functionOps
 * @type {PlaceHolder}
 */
let __ = Object.freeze ? Object.freeze(placeHolderInstance) : placeHolderInstance;
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
const id = x => x;

/**
 * Function operations: `
 * @module functionOps
 */

const apply$1 = curry(apply);
const until$$1 = curry(until$1);
/**
 * List operations that overlap (apart from globally overlapping props and functions like `length`)
 * on both strings and arrays.
 * @module jsPlatform_list
 * @private
 */

const slice$1 = curry(slice);
const includes$1 = curry(includes);
const indexOf$1 = curry(indexOf);
const lastIndexOf$1 = curry(lastIndexOf);

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
const split$1 = curry(split);

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
const append = curry(_append);
const map$1 = curry(_map);
const intersperse = curry(_intersperse);
const intercalate = curry(_intercalate);
const foldl = curry(_foldl);
const foldr = curry(_foldr);
const foldl1 = curry(_foldl1);
const foldr1 = curry(_foldr1);
const mapAccumL = curry(_mapAccumL);
const mapAccumR = curry(_mapAccumR);
const iterate = curry(_iterate);
const repeat = curry(_repeat);
const replicate = curry(_replicate);
const cycle = curry(_cycle);
const unfoldr = curry(_unfoldr);
const findIndex = curry(_findIndex);
const findIndices = curry(_findIndices);
const elemIndex = curry(_elemIndex);
const elemIndices = curry(_elemIndices);
const take = curry(_take);
const drop = curry(_drop);
const splitAt = curry(_splitAt);
const takeWhile = curry(_takeWhile);
const dropWhile = curry(_dropWhile);
const dropWhileEnd = curry(_dropWhileEnd);
const span = curry(_span);
const breakOnList = curry(_breakOnList);
const at = curry(_at);
const find = curry(_find);
const filter$1 = curry(_filter);
const partition = curry(_partition);
const elem = curry(_elem);
const lookup = curry(_lookup);
const isPrefixOf = curry(_isPrefixOf);
const isSuffixOf = curry(_isSuffixOf);
const isInfixOf = curry(_isInfixOf);
const isSubsequenceOf = curry(_isSubsequenceOf);
const groupBy = curry(_groupBy);
const stripPrefix = curry(_stripPrefix);
const zip = curry(_zip);
const zip3 = curry(_zip3);
const zip4 = curry(_zip4);
const zip5 = curry(_zip5);
const zipWith = curry(_zipWith);
const zipWithN = curry(_zipWithN);
const zipWith3 = curry(_zipWith3);
const zipWith4 = curry(_zipWith4);
const zipWith5 = curry(_zipWith5);
const any = curry(_any);
const all = curry(_all);
const scanl = curry(_scanl);
const scanl1 = curry(_scanl1);
const scanr = curry(_scanr);
const scanr1 = curry(_scanr1);
const remove = curry(_remove);
const sortOn = curry(_sortOn);
const sortBy = curry(_sortBy);
const insert = curry(_insert);
const insertBy = curry(_insertBy);
const nubBy = curry(_nubBy);
const removeBy = curry(_removeBy);
const removeFirstsBy = curry(_removeFirstsBy);
const unionBy = curry(_unionBy);
const union = curry(_union);
const intersect = curry(_intersect);
const intersectBy = curry(_intersectBy);
const difference = curry(_difference);
/**
 * Contains functions for operating strings.
 * @author elyde
 * @created 7/9/2017.
 * @module stringOps
 */
const lines = split$1(/[\n\r]/gm);
const words = split$1(/[\s\t]/gm);
const unwords = intercalate(' ');
const unlines = intercalate('\n');

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
        key: 'flatMap',
        value: function flatMap$$1(fn) {
            var out = fn(this.join()());
            return !(out instanceof this.constructor) ? IO.of(out) : IO.of(out.join()());
        }
    }, {
        key: 'fork',
        value: function fork() {
            var _this2 = this;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return IO.of(setTimeout(function () {
                return _this2.join().apply(undefined, args);
            }, 0));
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
    }, {
        key: 'do',
        value: function _do(io) {
            var _ref;

            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
            }

            return (_ref = IO.isIO(io) ? io : IO.of(io)).fork.apply(_ref, args);
        }
    }]);
    return IO;
}(Monad);

var Pos = function Pos(x, y) {
    classCallCheck(this, Pos);

    this.x = isset(x) ? x : 0;
    this.y = isset(y) ? y : 0;
};

var Pointer = function () {
    function Pointer(board, pos) {
        classCallCheck(this, Pointer);

        this.board = board || [];
        this.pos = pos || new Pos();
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
        positions = filter$1(posInBounds, map$1(function (offset) {
        return new Pos(pointer.pos.x + offset.x, pointer.pos.y + offset.y);
    }, offsets));
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
    return IO.do(IO.of(function () {
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
    }));
};
var drawBoard = function drawBoard(canvas, board) {
    return IO.do(function () {
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
var loop = curry(function (canvas, board) {
    return drawBoard(canvas, board).flatMap(function () {
        return loop(canvas, step(board)).fork();
    });
});
var main = function main() {
    var element = document.getElementById('game-of-comonads'),
        canvas = element.getContext('2d');

    return IO.of(function () {
        element.width = SIZE * SCALE;
        element.height = SIZE * SCALE;
        canvas.scale(SCALE, SCALE);
    }).flatMap(generateBoard).flatMap(loop(canvas))

    // Perform effects!
    .unsafePerformIO(); // Could also call `do` here (instead)
};

window.addEventListener('load', main);

}());
//# sourceMappingURL=index.js.map
