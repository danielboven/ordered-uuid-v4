import { generate as generateComb, convertTime as convertCombToTime } from 'ordered-uuid-v4';

let albums = [
  {
    album: 'Kiwanuka',
    artist: 'Michael Kiwanuka',
    release: 157260960034000
  },
  {
    album: 'Back to Black',
    artist: 'Amy Winehouse',
    release: 116195040051200
  },
  {
    album: 'No Time For Dreaming',
    artist: 'Charles Bradley',
    release: 129595680025000
  }
];

albums = albums
  .map(function (album) {
    // generateComb function accepts a custom function at options.timestamp
    album.id = generateComb({
      timestamp: album.release
    });
    delete album.release;
    return album;
  })
  .sort(function (a, b) {
    // we can now sort the albums based on the timestamp (release date) in the id property
    return convertCombToTime(a.id) - convertCombToTime(b.id);
  });

console.log(albums);
/* expected output: [
  {
    album: 'Back to Black',
    artist: 'Amy Winehouse',
    id: '69adc416-4000-XXXX-XXXX-XXXXXXXXXXXX' <- the second part is different on each run, since it contains 72 random bits
  },
  {
    album: 'No Time For Dreaming',
    artist: 'Charles Bradley',
    id: '75ddd878-e9a8-XXXX-XXXX-XXXXXXXXXXXX'
  },
  {
    album: 'Kiwanuka',
    artist: 'Michael Kiwanuka',
    id: '8f072ba8-ecd0-XXXX-XXXX-XXXXXXXXXXXX'
  }
] */