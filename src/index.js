"use strict";
import throttle from "lodash/function/throttle";
import isArray from "lodash/lang/isArray";

/**
 * @param {String|Array} types
 * @param {Number} wait
 * @param {Object} options
 */
function throttleActions(types, wait = 0, options = {}) {
  types = isArray(types) ? types : [types];

  return store => {
    const dispatch = store.dispatch;
    const throttled = throttle(dispatch, wait, options);

    return next => action => {
      if (types.indexOf(action.type) === -1) {
        return next(action);
      }
      return throttled(action);
    }
  }
}
