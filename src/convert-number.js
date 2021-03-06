import validate from './validate.js';

function convert(uuid) {
  if (!validate(uuid)) {
    throw TypeError('UUID input is invalid');
  }
  
  const hexTime = uuid.slice(0, 8) + uuid.slice(9, 13);
  const time = parseInt(hexTime, 16);

  const hexRandom = uuid.slice(14, 18);
  const numberRandom = parseInt(hexRandom, 16);

  // Return the number & random part
  return BigInt(time.toString() + numberRandom.toString());
}

export default convert;
