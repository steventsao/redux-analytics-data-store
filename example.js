"use strict";

var _redux = require("redux");

var _index = require("../src/index");

var b = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var mainReducer = function mainReducer(state, action) {
  return Object.assign({}, state);
};
var store = (0, _redux.createStore)(mainReducer);

console.log({ b: b }, " HI");