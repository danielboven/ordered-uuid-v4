# Ordered UUID v4 - COMB (combined time-GUID)

`ordered-uuid-v4` is a JavaScript package that can generate a COMB (combined time-GUID), basically an ordered UUID. The COMB/ordered UUID contains:
- 48-bit timestamp: the amount of centimilliseconds (10<sup>-5</sup>) since 00:00:00 UTC on 1 January 1970
- 72-bit of randomness

A COMB replaces the first first 48 bits of a version 4, random UUID with a timestamp. Therefore the UUIDs are monotonically increasing (each one coming after the previously-created one) and they can be conveniently ordered.

**Example** of a generated timestamp-first COMB: `9256dc86-ca15-4e2d-85e2-dfd4d103ae0b`

**Advantages**
- Enjoy the benefits of random UUID while also allow sorting in chronological order
- Compatible with software/databases that accept UUID v4 (because a COMB is in the same format as UUID v4)
- Still a [low chance of collision](https://itnext.io/laravel-the-mysterious-ordered-uuid-29e7500b4f8)

Please note: this package generates an indentifier that looks the same as a UUID v4. Even though the format is the same, it is non-standard and **not RFC-compliant**.

## Quickstart

**1. Install**

Use the package manager [npm](https://www.npmjs.com/) to install the package:

```bash
npm install ordered-uuid-v4
```

**2. Create a COMB** (ES6 module syntax)

```javascript
import { generate as generateComb } from 'ordered-uuid-v4';

const comb = generateComb();
console.log(comb);
// example of output: '9256cf92-2737-4a9c-8bb1-8f08c744b796'
```

... or using CommonJS syntax:


```javascript
const { generate: generateComb } = require('uuid');

const comb = generateComb();
console.log(comb);
```

## API summary

|  |  |
| --- | --- |
| [`comb.generate()`](#combgenerateoptions) | Generate a timestamp-first COMB |
| [`comb.convertTime()`](#combconvertTime) | Convert COMB string to a timestamp (formatted as UNIX, Date object, etc.) |
| [`comb.convertNumber()`](#combconvertNumberuuid) | Convert 48-bit timestamp & 15-bit random part of COMB string to a number |
| [`comb.validate()`](#combvalidatestr) | Test a string to see if it is a valid UUID v4; does not distinguish between COMB and UUID v4! |
| [`comb.timestamp()`](#combtimestamp) | Retrieve an integer consisting of the UNIX time & amount of centimilliseconds |
| [`comb.stringify()`](#combstringifytimestamp-arr) | Convert timestamp hex & array of bytes to UUID string  |

## API

### comb.generate([options])

Create a timestamp-first COMB

|  |  |
| --- | --- |
| [`options`] | `Object` with one or more of the following properties: |
| [`options.random`] | `Array` of 10 random bytes (0-255) |
| [`options.rng`] | Alternative to `options.random`, a `Function` that returns an `Array` of 10 random bytes (0-255) |
| [`options.timestamp`] | A `Function` that returns a `Number` of a 48-bit timestamp |
| _returns_ | COMB `String` |

Example:

```javascript
import { generate as generateComb } from 'ordered-uuid-v4';

generateComb(); // ⇨ '9256cf92-2737-4a9c-8bb1-8f08c744b796'
```

Example using predefined `random` values:

```javascript
import { generate as generateComb } from 'ordered-uuid-v4';

const options = {
  random: [
    0xc1,
    0xea,
    0x71,
    0xb4,
    0xef,
    0xe1,
    0x67,
    0x1c,
    0x58,
    0x36,
  ],
};
generateComb(options); // ⇨ '9257dfe0-e6a1-41ea-b1b4-efe1671c5836'
```

### comb.convertTime(uuid, type)

Get time information of COMB

&#x26a0;&#xfe0f; Note: Only convert ordered UUIDs - those of which you are certain that it was generated with a timestamp. There is no way for this package to know if your input is a COMB or not. If not, it will still return a value, but this value is random and therefore meaningless.

|           |                                                                  |
| --------- | ---------------------------------------------------------------- |
| `uuid`    | `String` COMB to convert                                         |
| [`type`]  | `String` format to return date in (see list below)               |
| _returns_ | `Number` (48-bit), or date/time in format as specified at `type` |
| _throws_  | `TypeError` if the UUID input string is invalid                  |

Options for `type`:

|     |     |     |
| --- | --- | --- |
| `unix` | `Number` Unix time without extra precision | May be used for displaying time, not recommended for sorting |
| `unix-float` | `Number` floating point - Same as `unix`, except it has extra precision (after the decimal) | |
| `date-object` | `Date` object with millisecond precision | Useful for displaying time, as input for time lib (e.g. Moment.js) |
| _Fallback_ (default - no type specified) | `Number` amount of centimilliseconds since 00:00:00 UTC on 1 January 1970 | Best type to use for sorting between identifiers |

Example _Fallback_:

```javascript
import { convertTime as combConvertTime } from 'ordered-uuid-v4';

combConvertTime('9257e320-80ff-44b6-a5b3-d8efedc3725c'); // ⇨ 160906170368255
```

Example `date-object`:

```javascript
import { convertTime as combConvertTime } from 'ordered-uuid-v4';

const date = combConvertTime('9257e320-80ff-44b6-a5b3-d8efedc3725c', 'date-object');
console.log(date); // expected output: 2020-12-27T09:35:03.682Z
```

### comb.convertNumber(uuid)

Get time information of COMB combined with a random part. Useful for consistent sorting if the centimillisecond precision of the timestamp is not great enough (see _situation_)

|           |                                                                      |
| --------- | -------------------------------------------------------------------- |
| `uuid`    | `String` COMB to convert                                             |
| _returns_ | `BigInt` consisting of the 48-bit timestamp and a 15-bit random part |
| _throws_  | `TypeError` if the UUID input string is invalid                      |


Example:
```javascript
import { convertNumber as combConvertNumber } from 'ordered-uuid-v4';

combConvertNumber('9257e320-80ff-44b6-a5b3-d8efedc3725c'); // expected return: 16090617036825517590n
```

**Situation**: when generating COMBs in a loop, multiple COMBS might be generated at the same time, meaning they have the same timestamp. This means they cannot be ordered chronologically. The best you can do is to also convert a part of the random bits of the COMB to a number and append this to the timestamp. Why? Because then the input order does not matter and can therefore be different every time, though the sorting output will be consistent every time. The `convertNumber` function can help accomplish this, as can be seen in [this example](examples/small-time-interval-sorting.js).

### comb.validate(str)

Test a string to see if it is a valid UUID v4/COMB.

&#x26a0;&#xfe0f; Note: This function cannot distinguish between a true RFC-compliant UUID v4 and a timestamp-first COMB as input; both inputs will return `true`.

|           |                                                     |
| --------- | --------------------------------------------------- |
| `str`     | `String` to validate                                |
| _returns_ | `true` if string is a valid UUID, `false` otherwise |

Example:

```javascript
import { validate as validateComb } from 'ordered-uuid-v4';

validateComb('not valid'); // ⇨ false
validateComb('9257e320-80ff-44b6-a5b3-d8efedc3725c'); // ⇨ true
```

### comb.timestamp()

Retrieve current time

|           |                                                                                       |
| --------- | ------------------------------------------------------------------------------------- |
| _returns_ | `Number` Timestamp - amount of centimilliseconds since 00:00:00 UTC on 1 January 1970 |

Example:

```javascript
import { timestamp as combTimestamp } from 'ordered-uuid-v4';

combTimestamp(); // ⇨ 160906771016926
```

### comb.stringify(timestamp, arr)

Convert array of bytes to UUID string

|             |                                                     |
| ----------- | --------------------------------------------------- |
| `timestamp` | `String` 48-bit timestamp in hex format             |
| `arr`       | `Array`-like collection of 10 values between 0-255. |
| _returns_   | `String`                                            |
| _throws_    | `TypeError` if a valid string cannot be generated   |

Example:

```javascript
import { stringify as combStringify } from 'ordered-uuid-v4';

const timestamp = '9258059fac7c';
const bytes = [
  0x43,
  0xda,
  0x97,
  0x5e,
  0x2a,
  0x8a,
  0xd9,
  0xeb,
  0xae,
  0x0b,
];

combStringify(timestamp, bytes); // ⇨ '9258059f-ac7c-43da-975e-2a8ad9ebae0b'
```

## Sources & material

- Blog post: [The mysterious “Ordered UUID”](https://itnext.io/laravel-the-mysterious-ordered-uuid-29e7500b4f8#302a)
- The [ramsey/uuid](https://github.com/ramsey/uuid) implementation has a codec named `TimestampFirstCombCodec`. This has been the reference implementation for creating this package. Check out [this great page](https://uuid.ramsey.dev/en/latest/customize/timestamp-first-comb-codec.html) for more information.
- The [uuidjs/uuid](https://github.com/uuidjs/uuid) codebase has been the foundation for the code of this package; many functions are similar to those found in that package.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)