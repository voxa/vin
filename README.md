# @voxasoftworks/vin

`@voxasoftworks/vin` is a Typescript package for validating North American vehicle identification numbers (VINs)

This package checks for the right length, the right characters and a correct check digit.

## Usage

```js
import { validate } from '@voxasoftworks/vin'

console.log(validate('11111111111111111'));
// => true

console.log(validate('I\'m not valid!'));
// => false

console.log(validate(null));
// => false

console.log(validate(undefined));
// => false
```
