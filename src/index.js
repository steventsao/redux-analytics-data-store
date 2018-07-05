const PAGE_EVENT = "allPages";

let rejectBlacklistedKeys = function(
  state = {},
  blacklistedKeys = {
    password: true,
    isIncomeEligible: true
  }
) {
  let result = {};
  Object.keys(state).forEach(key => {
    if (blacklistedKeys[key] === undefined) {
      result[key] = state[key];
    }
  });
  return state;
};
let createAnalyticsDataStore = function(
  window = {},
  satellite = { track: function() {} },
  options
) {
  return ({ dispatch, getState }) => next => action => {
    const targetEvent =
      options.events && options.events[action.type]
        ? options.events[action.type]
        : PAGE_EVENT;
    let result = next(action);
    if (Array.isArray(window.dataLayer)) {
      // Push the latest action to data layer
      window.dataLayer.push(action);
    } else {
      // Or update dataLayer with the computed app state
      window.dataLayer = rejectBlacklistedKeys(result);
    }
    satellite.track(targetEvent);
    return result;
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
