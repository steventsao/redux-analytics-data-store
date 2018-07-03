import { createStore } from "redux";
import * as b from "../src/index";

let mainReducer = (state, action) => {
  return Object.assign({}, state);
};
const store = createStore(mainReducer);

console.log({ b }, " HI");
