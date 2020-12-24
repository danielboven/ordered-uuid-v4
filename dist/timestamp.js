"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _performanceNow = _interopRequireDefault(require("performance-now"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function timestamp() {
  // More information on timestamp retrieval: https://stackoverflow.com/a/18197438/7346359  
  var loadTimeInMS = Date.now(); // Note: to get precision in microseconds the time below should be multiplied by a 1000,
  // but that adds 1 superfluous integer at the end which cannot be used in the COMB.
  // Therefore it must be multiplied by only a 100 (meaing centimilli seconds)

  var time = (loadTimeInMS + (0, _performanceNow["default"])()) * 100; // Round to remove unnecessary digits

  return Math.round(time);
}

var _default = timestamp;
exports["default"] = _default;