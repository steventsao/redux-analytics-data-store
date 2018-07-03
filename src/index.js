const PAGE_EVENT = "allPages";

let rejectBlacklistedKeys = function(state = {}, blacklistedKeys = {}) {
  let result = {};
  Object.keys(state).forEach(key => {
    if (blacklistedKeys[key] === undefined) {
      result[key] = state[key];
    }
  });
  return state;
};
let blacklistedKeys = {
  password: true,
  isIncomeEligible: true
};
let createAnalyticsDataStore = function(window, satellite) {
  return ({ dispatch, getState }) => next => action => {
    window = window || {};
    satellite = satellite || { track: function() {} };
    window.digitalData = rejectBlacklistedKeys(getState(), blacklistedKeys);
    satellite.track(PAGE_EVENT);
    return next(action);
  };
};

const analyticsDataStore = createAnalyticsDataStore();

module.exports = analyticsDataStore;
