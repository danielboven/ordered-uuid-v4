"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _rng = _interopRequireDefault(require("./rng.js"));

var _stringify = _interopRequireDefault(require("./stringify.js"));

var _timestamp = _interopRequireDefault(require("./timestamp.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function comb(options) {
  options = options || {};

  var rnds = options.random || (options.rng || _rng["default"])();

  var hexTimestamp = (options.timestamp || _timestamp["default"])().toString(16); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  // Also note: the indices below are the result of subtracting the indices of standard uuid v4 by 6,
  // since we only have 10 random bytes instead of the standard 16


  rnds[0] = rnds[0] & 0x0f | 0x40;
  rnds[2] = rnds[2] & 0x3f | 0x80;
  return (0, _stringify["default"])(hexTimestamp, rnds);
}

var _default = comb;
exports["default"] = _default;