import { createApp } from ".";

// load .env file
require('dotenv').config();

// bootstrap app for node
const port = +(process.env.PORT || 3000);
createApp().listen(port, () => {
  console.log(`API running on port: ${port}`)
});
