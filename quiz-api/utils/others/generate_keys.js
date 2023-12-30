const fs = require('fs');
const crypto = require('crypto');

const webpush = require('web-push');

// Generate VAPID keys
const vapidKeys = webpush.generateVAPIDKeys();

console.log('VAPID Public Key:', vapidKeys.publicKey);
console.log('VAPID Private Key:', vapidKeys.privateKey);
// Generate a random cryptographic key
const generateCryptoKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Generate a new session secret
const generateSessionSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

const envFilePath = '.env';
const envLocalFilePath = '.env.local';

// Check if .env file already exists
if (!fs.existsSync(envFilePath)) {
  try {
    // Copy .env.local to .env
    console.log('.env file created by copying from .env.local');
  } catch (err) {
    console.error('Error copying .env.local to .env:', err.message);
  }
} else {
  console.log('.env file already exists, no action needed.');
}
fs.copyFileSync(envLocalFilePath, envFilePath);

// Read the existing .env file
const envData = fs.readFileSync(envFilePath, 'utf8');

// Update the .env file with new keys
const updatedEnvData = envData
  .replace(/JWT_SECRET=.*/, `JWT_SECRET=${generateCryptoKey()}`)
  .replace(/VAPID_PUBLIC_KEY=.*/, `VAPID_PUBLIC_KEY=${vapidKeys.publicKey}`)
  .replace(/VAPID_PRIVATE_KEY=.*/, `VAPID_PRIVATE_KEY=${vapidKeys.privateKey}`)
  .replace(/CRYPTO_KEY=.*/, `CRYPTO_KEY=${generateCryptoKey()}`)
  .replace(/SESSION_SECRET=.*/, `SESSION_SECRET=${generateSessionSecret()}`);

// Write the updated data back to the .env file
fs.writeFileSync(envFilePath, updatedEnvData, 'utf8');

console.log('Secret keys updated in .env file.');

