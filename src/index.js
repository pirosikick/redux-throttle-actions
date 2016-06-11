import throttle from "lodash.throttle";
import isArray from "lodash.isArray";

/**
 * @param {String|Array} types The String or Array.
 * A set of action types to be throttled.
 * @param {Number} wait The number of milliseconds to throttle actions to.
 * @param {Object} options The options object for _.throttle.
 * See also https://lodash.com/docs#throttle.
 */
function throttleActions(types, wait = 0, options = undefined) {
  types = isArray(types) ? types : [types];

  return store => next => {
    const throttled = throttle(next, wait, options);

    return action => {
      if (types.indexOf(action.type) === -1) {
        return next(action);
      }
      return throttled(action);
    }
  }
}

export default throttleActions;
