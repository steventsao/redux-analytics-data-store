let createAnalyticsDataStore = function(window, satellite) {
  return ({ dispatch, getState }) => next => action => {
    window = window || {};
    satellite = satellite || { track: function() {} };
    window.digitalData = getState();
    satellite.track("allPages");
    return next(action);
  };
};

const analyticsDataStore = createAnalyticsDataStore();
analyticsDataStore.withExtraArgument = createAnalyticsDataStore; // not sure what this line is for

module.exports = analyticsDataStore;
