"use strict";

var createAnalyticsDataStore = function createAnalyticsDataStore() {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        window.digitalData = getState();
        console.log(window.digitalData);
        return next(action);
      };
    };
  };
};

var analyticsDataStore = createAnalyticsDataStore();
analyticsDataStore.withExtraArgument = createAnalyticsDataStore; // not sure what this line is for

module.exports = analyticsDataStore;