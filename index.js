let createAnalyticsDataStore = function(...args) {
  return ({ dispatch, getState }) => next => action => {
    window.digitalData = getState();
    console.log(window.digitalData);
    return next(action);
  };
};

const analyticsDataStore = createAnalyticsDataStore();
analyticsDataStore.withExtraArgument = createAnalyticsDataStore; // not sure what this line is for

export default analyticsDataStore;
