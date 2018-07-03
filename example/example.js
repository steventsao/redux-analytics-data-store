import { createStore, applyMiddleware } from "redux";
import createAnalyticsDataStore from "./index";

let mainReducer = (state = { login: true }, action) => {
  switch (action.type) {
    case "ADD":
      return state;
    default:
      return state;
  }
  return Object.assign({}, state);
};
const store = createStore(
  mainReducer,
  applyMiddleware(createAnalyticsDataStore)
);

store.dispatch({ type: "ADD" });
