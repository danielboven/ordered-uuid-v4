import {now as nowInMicroseconds} from "microtime";

function timestamp() {
  // More information on timestamp retrieval: https://stackoverflow.com/a/18197438/7346359  
  // Note: to get precision in microseconds the time below should be used as is,
  // but that adds 1 superfluous integer at the end which cannot be used in the COMB.
  // Therefore it must be multiplied by 0.1 (meaing centimilli seconds)
  const time = 0.1 * nowInMicroseconds();
  // Round to remove unnecessary digits
  return Math.round(time);
}

export default timestamp;
