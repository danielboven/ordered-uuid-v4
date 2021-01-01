import { convertTime as convertCombToTime } from 'ordered-uuid-v4';

const items = [
  {
    id: '920de9ac-54a0-4388-b90a-7bb307287453',
    name: 'Butter'
  },
  {
    id: '92478981-4417-4a42-8c53-d2a6746a5f5b',
    name: 'Cheese'
  },
  {
    id: '923fb53b-aefc-46bf-a556-75cd360fd268',
    name: 'Eggs'
  }
];

// Getting date as a JS Date object
items.forEach(function (item) {
  console.log(`Item: ${item.name}`);
  console.log(`Date: ${convertCombToTime(item.id, 'date-object')}\n`);
});

/*
// Getting the UNIX timestamp
items.forEach(function (item) {
  console.log(`Item: ${item.name}`);
  console.log(`Unix: ${convertCombToTime(item.id, 'unix')}\n`);
});
*/