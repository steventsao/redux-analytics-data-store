## Connecting the dots

Both a data layer and redux store are about describing application state.

```javascript
// Component -> Action -> Reducer -> Store -> Component -> ...
```

### Can analytics be implemented as a middleware between reducers and store in Redux?

```javascript
// Component -> Action -> Reducer -> MIDDLEWARE -> Store -> Component -> ...

// ie. Logger middleware
const logger = store => next => action => {
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  return result;
};
```

```javascript
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

const store = createStore(
  mainReducer,
  applyMiddleware(
    createAnalyticsDataStore(exampleWindow, mockSatellite, {
      events: { DELETE_TODO: "userAction" }
    })
  )
);

store.dispatch({ type: "LOGIN" });
console.log({ window, appState: store.getState() });
// allPages was fired
// { window: { dataLayer: { isLoggedIn: true } },
//   appState: { isLoggedIn: true } }

store.dispatch({ type: "ADD_TODO" });
console.log({ window, appState: store.getState() });
// allPages was fired
// { window: { dataLayer: { isLoggedIn: true, todo: [Array] } },
//   appState: { isLoggedIn: true, todo: [ 'test' ] } }

store.dispatch({ type: "DELETE_TODO" });
console.log({ window, appState: store.getState() });
// userAction was fired
// { window: { dataLayer: { isLoggedIn: true, todo: [] } },
//   appState: { isLoggedIn: true, todo: [] } }
```
