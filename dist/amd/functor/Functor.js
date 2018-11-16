define(["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.toFunctor = void 0;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  /**
   * Functor class and associated operations.
   * Created by edlc on 12/9/16.
   * @module functor
   */

  /**
   * Always returns a functor;  If given value is not
   * a functor creates one from given value to it.
   * @function module:functor.toFunctor
   * @param x {{map: Function}|*} - Functor or any.
   * @returns {*}
   */
  var toFunctor = function toFunctor(x) {
    return !x.map ? new Functor(x) : x;
  };
  /**
   * Plain old functor class.
   * @class module:functor.Functor
   * @param value {*}
   * @property value {*}
   */


  _exports.toFunctor = toFunctor;

  var Functor =
  /*#__PURE__*/
  function () {
    /**
     * @constructor
     * @param value {*}
     */
    function Functor(value) {
      _classCallCheck(this, Functor);

      this.value = value;
    }
    /**
     * Extracts value of functor (same as monadic `join`).
     * @method module:functor.Functor#valueOf
     * @returns {*}
     */


    _createClass(Functor, [{
      key: "valueOf",
      value: function valueOf() {
        return this.value;
      }
      /**
       * Maps a function over contents of functor.
       * @method module:functor.Functor#map
       * @param fn {Function} - Function that takes one `any` and returns one `any`.
       * @returns {Functor}
       */

    }, {
      key: "map",
      value: function map(fn) {
        return new this.constructor(fn(this.valueOf()));
      }
      /**
       * Same as `#Functor.map`.
       * @method module:functor.Functor#fmap
       * @param fn {Function}
       * @returns {Functor}
       */

    }, {
      key: "fmap",
      value: function fmap(fn) {
        return this.map(fn);
      }
    }]);

    return Functor;
  }();

  _exports.default = Functor;
});