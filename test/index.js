import assert from "assert";
import {createStore, combineReducers, applyMiddleware} from "redux";
import throttleActions from "../lib/index";

describe('throttleActions(actionTypes, wait, options)', function () {
  const actionType = "TEST_TYPE";
  const action = (type, value) => ({ type, value });
  const store = (middleware, reducers) => {
    const combined = combineReducers(reducers);
    return applyMiddleware(middleware)(createStore)(combined);
  };
  const wait = 300;

  describe('wait', function () {
    beforeEach(function () {
      const middleware = throttleActions([actionType], wait);
      const reducers = {
        test: (state, action) => {
          if (action.type === actionType) {
            return action.value;
          }
          return "default";
        }
      };
      this.store = store(middleware, reducers);
    });

    it("throttles actions to wait milliseconds", function (done) {
      const store = this.store;
      store.dispatch(action(actionType, "first time"));
      store.dispatch(action(actionType, "second time"));

      assert.equal(store.getState().test, "first time");
      setTimeout(() => {
        assert.equal(store.getState().test, "second time");
        done();
      }, wait);
    });
  });

  describe("when acion not to be throttled was dispatched", function () {
    let anotherType = "ANOTHER_TYPE";
    beforeEach(function () {
      const middleware = throttleActions([actionType], wait);
      const reducers = {
        test: (state, action) => {
          if (action.type === actionType || action.type === anotherType) {
            return action.value;
          }
          return "default";
        }
      };
      this.store = store(middleware, reducers);
    });

    it("passes through the middleware", function () {
      let store = this.store;
      store.dispatch(action(actionType, "first time"));
      assert.equal(store.getState().test, "first time");

      store.dispatch(action(actionType, "second time"));
      assert.equal(store.getState().test, "first time");

      store.dispatch(action(anotherType, "another time"));
      assert.equal(store.getState().test, "another time");
    });
  });
});


