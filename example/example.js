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
const store = createStore(
  mainReducer,
  applyMiddleware(createAnalyticsDataStore(exampleWindow))
);

store.dispatch({ type: "ADD" });
console.log(exampleWindow, store.getState());
// {} { login: true }

store.dispatch({ type: "ADD" });
console.log(exampleWindow, store.getState());
// { digitalData: { login: true } } { login: true, todo: [ 'test' ] }
