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

    const targetEvent =
      options.events && options.events[action.type]
        ? options.events[action.type]
        : PAGE_EVENT;
    satellite.track(targetEvent);
    return next(action);
  };
};

let createDataLayerForGTM = function(window, options) {
  return ({ dispatch, getState }) => next => action => {
    window = window || {};
    window.dataLayer = window.dataLayer || [];
    let dataLayerPayload = getDataLayerPayload(action, options);
    window.dataLayer.push(dataLayerPayload);
  };
};

module.exports = { createAnalyticsDataStore, createDataLayerForGTM };
