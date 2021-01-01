import { generate as generateComb, convertNumber as convertCombToNumber } from 'ordered-uuid-v4';

let items = [
  { letter: 'A' },
  { letter: 'B' },
  { letter: 'C' },
  { letter: 'D' },
  { letter: 'E' },
  { letter: 'F' },
  { letter: 'G' },
  { letter: 'H' },
  { letter: 'J' },
  { letter: 'I' },
  { letter: 'K' },
  { letter: 'L' },
  { letter: 'M' },
  { letter: 'N' },
  { letter: 'O' },
  { letter: 'P' },
  { letter: 'Q' },
  { letter: 'R' },
  { letter: 'S' },
  { letter: 'T' },
  { letter: 'U' },
  { letter: 'V' },
  { letter: 'W' },
  { letter: 'X' },
  { letter: 'Y' },
  { letter: 'Z' }
];

// Problem: when adding the IDs to each object, the interval between adding might
// be too small to create a unique timestamp, meaning the timestamp on one object might be
// the same as on the sequential object

items = items.map(function (item) {
  item.id = generateComb();
  return item;
});

// Solution: since we cannot get a proper time-based order, we try to get a consistent order each time
// when sorting by also converting a random part of the UUID to a number. This means that the input order
// of the array with UUIDs does not matter, we get the same sorted result every time.
// If you were to use convertTime, the input order of the UUIDs does matter, therefore results after sorting
// might not be consistent (depending on your input).

items.sort(function (a, b) {
  return convertCombToNumber(a.id) - convertCombToNumber(b.id);
});

console.log(items);