import now from "performance-now";

function timestamp() {
  // More information on timestamp retrieval: https://stackoverflow.com/a/18197438/7346359  
  const loadTimeInMS = Date.now();
  // Note: to get precision in microseconds the time below should be multiplied by a 1000,
  // but that adds 1 superfluous integer at the end which cannot be used in the COMB.
  // Therefore it must be multiplied by only a 100 (meaing centimilli seconds)
  const time = (loadTimeInMS + now()) * 100;
  // Round to remove unnecessary digits
  return Math.round(time);
}

export default timestamp;
