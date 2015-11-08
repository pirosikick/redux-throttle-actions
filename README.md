[![npm version](https://badge.fury.io/js/redux-throttle-actions.svg)](http://badge.fury.io/js/redux-throttle-actions)
[![david](https://david-dm.org/pirosikick/redux-throttle-actions.svg)](https://david-dm.org/pirosikick/redux-throttle-actions)
[![Build Status](https://travis-ci.org/pirosikick/redux-throttle-actions.svg)](https://travis-ci.org/pirosikick/redux-throttle-actions)

redux-throttle-actions
======================

A Redux middleware which throttles actions.

## Usage

```javascript
import {createStore, applyMiddleware} from "redux";
import throttleActions from "redux-throttle-actions";
import reducers from "./reducers";

const middleware = throttleActions([], { ... });
const store = applyMiddleware(middleware)(createStore)(reducers);

// In View
store.dispatch(action);
```

### `throttleActions(actionTypes, wait = 0, options = {})`

Returns a middleware function to be passed to `applyMiddleware`.

#### actionTypes

String or Array. Required.
A set of action types to be throttled.

#### wait

The number of milliseconds to throttle actions to.

#### options

The options object for `_.throttle`.
See also [https://lodash.com/docs#throttle](https://lodash.com/docs#throttle).

## License

[MIT](http://pirosikick.mit-license.org/)
