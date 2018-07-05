import { createStore, applyMiddleware } from "redux";
import { createAnalyticsDataStore } from "./index";

let mainReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return Object.assign({}, state, { todo: ["test"] });
    case "DELETE_TODO":
      return Object.assign({}, state, { todo: [] });
    case "LOGIN":
      return Object.assign({}, state, { isLoggedIn: true });

    default:
      return state;
  }
  return Object.assign({}, state);
};
let window = {};
let mockSatellite = {
  track: function(event) {
    console.log(`${event} was fired`);
  }
};
const store = createStore(
  mainReducer,
  applyMiddleware(
    createAnalyticsDataStore(window, mockSatellite, {
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
