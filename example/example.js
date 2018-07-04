import { createStore, applyMiddleware } from "redux";
import createAnalyticsDataStore from "./index";

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
