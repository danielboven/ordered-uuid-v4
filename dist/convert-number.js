"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validate = _interopRequireDefault(require("./validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function convert(uuid) {
  if (!(0, _validate["default"])(uuid)) {
    throw TypeError('UUID input is invalid');
  }

  var hexTime = uuid.slice(0, 8) + uuid.slice(9, 13);
  var time = parseInt(hexTime, 16);
  var hexRandom = uuid.slice(14, 18);
  var numberRandom = parseInt(hexRandom, 16); // Return the number & random part

  return BigInt(time.toString() + numberRandom.toString());
}

var _default = convert;
exports["default"] = _default;