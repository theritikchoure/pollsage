const crypto = require('crypto');

// Define the length of the key in bytes (for example, 32 bytes for a 256-bit key)
const keyLengthBytes = 32;

// Generate a random key
const randomKey = crypto.randomBytes(keyLengthBytes);

// Convert the random key to a hexadecimal string
const hexKey = randomKey.toString('hex');

console.log('Random Key:', hexKey);
