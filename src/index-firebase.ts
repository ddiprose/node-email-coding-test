import { createApp } from ".";
const functions = require('firebase-functions');

const config = functions.config();
// Porting envs from firebase config
for (const key in config.envs){
  process.env[key.toUpperCase()] = config.envs[key];
}

// bootstrap app for firebase
exports['http'] = functions.https.onRequest(createApp({
  isFirebase: true
}).callback());
