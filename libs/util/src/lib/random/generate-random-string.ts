/**
 * Generates a random number string of the given length.
 * @param length The length of the random number string to generate.
 * Defaults to 10. If 0 or less, defaults to 10.
 * Round down if a decimal is given.
 * @returns A random number string of the given length.
 * @example
 * generateRandomNumberString(10); // 1234567890
 * generateRandomNumberString(5); // 12345
 * generateRandomNumberString(1); // 1
 * generateRandomNumberString(); // 1234567890
 * generateRandomNumberString(0); // 1234567890
 * generateRandomNumberString(10.5); // 1234567890
 */
export function generateRandomNumberString(length = 10): string {
    if (length <= 0) {
        length = 10;
    }
    length = Math.floor(length);
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomDigit = Math.floor(Math.random() * 10);
        result += randomDigit;
    }
    return result;
}

/**
 * Generates a random string of the given length.
 * @param length The length of the random string to generate.
 * Defaults to 10. If 0 or less, defaults to 10.
 * Round down if a decimal is given.
 * @returns A random string of the given length.
 * @example
 * generateRandomString(10); // 12ew4rd5tg
 * generateRandomString(5); // e2ew4
 * generateRandomString(1); // q
 * generateRandomString(); // 12ew4rd5tg
 * generateRandomString(0); // 12ew4rd5tg
 * generateRandomString(10.5); // 12ew4rd5tg
 */
export function generateRandomString(length = 10): string {
    if (length <= 0) {
        length = 10;
    }
    length = Math.floor(length);
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomDigit = Math.floor(Math.random() * 26);
        const randomCase = Math.floor(Math.random() * 2);
        if (randomCase === 0) {
            result += String.fromCharCode(65 + randomDigit);
        } else {
            result += String.fromCharCode(97 + randomDigit);
        }
    }
    return result;
}

/**
 * Generates a random hexadecimal string of the given length.
 * @param length The length of the random hexadecimal string to generate.
 * Defaults to 10. If 0 or less, defaults to 10.
 * Round down if a decimal is given.
 * @returns A random hexadecimal string of the given length.
 * @example
 * generateRandomHexString(10); // 12a4f6c8e0
 * generateRandomHexString(5); // 12a4f
 * generateRandomHexString(1); // 1
 * generateRandomHexString(); // 12a4f6c8e0
 * generateRandomHexString(0); // 12a4f6c8e0
 * generateRandomHexString(-8); // 12a4f6c8e0
 * generateRandomHexString(10.5); // 12a4f6c8e0
 */
export function generateRandomHexString(length = 10): string {
    // Each byte is two characters long in hexadecimal, so we only need length/2 bytes
    // Slice to remove the extra characters if length is odd
    // First create a random array of bytes
    if (length <= 0) {
        length = 10;
    }
    const randomBytes = new Uint8Array(Math.floor(length / 2 + 1)).map(() =>
        Math.floor(Math.random() * 256),
    );
    // Then convert the bytes to hexadecimal
    const randomHexString = Array.from(randomBytes)
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
    // Then slice to the correct length
    return randomHexString.slice(0, length);
}
