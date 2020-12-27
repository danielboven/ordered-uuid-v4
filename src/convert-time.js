import validate from './validate.js';

function decode(uuid, type) {
  if (!validate(uuid)) {
    throw TypeError('UUID input is invalid');
  }
  
  const hexTime = uuid.slice(0, 8) + uuid.slice(9, 13);
  const time = parseInt(hexTime, 16);

  switch(type) {
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

export default decode;
