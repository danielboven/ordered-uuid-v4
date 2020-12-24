import rng from './rng.js';
import stringify from './stringify.js';
import timestamp from './timestamp.js';

function comb(options) {
  options = options || {};

  const rnds = options.random || (options.rng || rng)();
  const hexTimestamp = (options.timestamp || timestamp)().toString(16);

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  // Also note: the indices below are the result of subtracting the indices of standard uuid v4 by 6,
  // since we only have 10 random bytes instead of the standard 16
  rnds[0] = (rnds[0] & 0x0f) | 0x40;
  rnds[2] = (rnds[2] & 0x3f) | 0x80;

  return stringify(hexTimestamp, rnds);
}

export default comb;
