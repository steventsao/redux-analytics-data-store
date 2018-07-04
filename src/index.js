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
let createAnalyticsDataStore = function(window, satellite, options) {
  return ({ dispatch, getState }) => next => action => {
    window = window || {};
    satellite = satellite || { track: function() {} };
    window.digitalData = rejectBlacklistedKeys(getState(), blacklistedKeys);
    if (options.events && options.events[action.type]) {
      satellite.track(options.events[action.type]);
    } else {
      satellite.track(PAGE_EVENT);
    }
    return next(action);
  };
};

module.exports = createAnalyticsDataStore;
