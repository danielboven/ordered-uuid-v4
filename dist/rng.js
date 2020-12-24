"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = rng;

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

var poolPtr = rnds8Pool.length;

function rng() {
  if (poolPtr > rnds8Pool.length - 10) {
    _crypto["default"].randomFillSync(rnds8Pool);

    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, poolPtr += 10);
}