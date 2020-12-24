"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validate = _interopRequireDefault(require("./validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function decode(uuid, type) {
  if (!(0, _validate["default"])(uuid)) {
    throw TypeError('UUID input is invalid');
  }

  var hexTime = uuid.slice(0, 8) + uuid.slice(9, 13);
  var time = parseInt(hexTime, 16);

  switch (type) {
    case 'unix':
      return Math.trunc(time / 1e5);

    case 'unix-float':
      return time / 1e5;

    case 'date-object':
      return new Date(Math.trunc(time / 100));

    default:
      return time;
  }
}

var _default = decode;
exports["default"] = _default;