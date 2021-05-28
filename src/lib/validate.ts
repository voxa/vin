/**
 * Determines whether a vehicle identification number (VIN) is valid based on
 * length and check digit
 *
 * ### Example (es module)
 * ```js
 * import { validate } from '@voxa/vin';
 *
 * console.log(validate('11111111111111111'));
 * // => true
 * ```
 *
 * ### Example (es module)
 * ```js
 * var validate = require('@voxa/vin').validate;
 * 
 * console.log(validate('11111111111111111'));
 * // => true
 * ```
 *
 * @param vin - the VIN to be validated
 * @returns boolean based on VIN validity
 */
export const validate = (vin?: string | null): boolean => {
    // If VIN is null or undefined, return false
    if (!vin) {
        return false;
    }

    // Convert VIN to uppercase
    vin = vin.toUpperCase();

    const vinRegex = /^[A-HJ-NPR-Z\d]{8}[\dX][A-HJ-NPR-Z\d]{8}$/g;

    // If VIN fails regex, return false
    if (!vinRegex.test(vin)) {
        return false;
    }

    // Convert VIN to string of characters
    const vinArray = [...vin];

    // Define weighting factors and transliteration table
    const factors = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];
    const table: { readonly [c: string]: number } = {
        A: 1,
        B: 2,
        C: 3,
        D: 4,
        E: 5,
        F: 6,
        G: 7,
        H: 8,
        J: 1,
        K: 2,
        L: 3,
        M: 4,
        N: 5,
        P: 7,
        R: 9,
        S: 2,
        T: 3,
        U: 4,
        V: 5,
        W: 6,
        X: 7,
        Y: 8,
        Z: 9,
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
    };

    // Get check digit at ninth position
    const check = vin.charAt(8);

    // Calculate the sum of transliterated digits
    const sum = vinArray
        .map((c, i) => table[c] * factors[i])
        .reduce((a, c) => a + c);

    // Calculate remainder, and convert to string
    const remainder = sum % 11;
    const calculatedCheck = remainder.toString();

    // Check whether check digit matches
    const isValid =
        check === 'X' ? calculatedCheck === '10' : calculatedCheck === check;

    return isValid;
};
