import validate from './validate.js';

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(timestamp, randomArr) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  const uuid = (
    timestamp.slice(0, 8) +
    '-' +
    timestamp.slice(8, 12) +
    '-' +
    byteToHex[randomArr[0]] +
    byteToHex[randomArr[1]] +
    '-' +
    byteToHex[randomArr[2]] +
    byteToHex[randomArr[3]] +
    '-' +
    byteToHex[randomArr[4]] +
    byteToHex[randomArr[5]] +
    byteToHex[randomArr[6]] +
    byteToHex[randomArr[7]] +
    byteToHex[randomArr[8]] +
    byteToHex[randomArr[9]]
  ).toLowerCase();

  // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields
  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

export default stringify;
