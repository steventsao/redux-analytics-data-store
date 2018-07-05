## Connecting the dots

1.  Data layer is metadata about the user state that vendors ingests to power analytics.
2.  Unidirectional data flow encourages application state to be encapsulated within a single store.
3.  All mutation is described in actions before the reducers take them to compute the next application state

### Can analytics be implemented as a middleware between reducers and store in Redux?

```javascript
let mainReducer = (state = { login: true }, action) => {
  switch (action.type) {
    case "ADD":
      return Object.assign({}, state, { todo: ["test"] });
    default:
      return state;
  }
  return Object.assign({}, state);
};
let exampleWindow = {};
let mockSatellite = {
  track: function(event) {
    console.log(`${event} was fired`);
  }
};
const store = createStore(
  mainReducer,
  applyMiddleware(
    createAnalyticsDataStore(exampleWindow, mockSatellite, {
      events: { DELETE_TODO: "userAction" }
    })
  )
);

store.dispatch({ type: "ADD" });
console.log(exampleWindow, store.getState());
// {} { login: true }

store.dispatch({ type: "ADD" });
console.log(exampleWindow, store.getState());
// { digitalData: { login: true, todo: [ 'test' ] } } { login: true, todo: [ 'test' ] }
// userAction was fired

store.dispatch({ type: "DELETE_TODO" });
console.log(exampleWindow, store.getState());
// userAction was fired
// { digitalData: { login: true, todo: [ 'test' ] } } { login: true, todo: [ 'test' ] }
```
