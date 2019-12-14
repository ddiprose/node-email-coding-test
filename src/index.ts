import { appAsMiddleWare } from './app';
import { errorHandler } from './middleware/error-handler';
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const requestId = require('@kasa/koa-request-id');

// load .env file
require('dotenv').config();

// bootstrap app
const port = +(process.env.PORT || 3000);
const app = new Koa();
app
  .use(requestId())
  .use(appAsMiddleWare)
  .use(errorHandler)
  .use(bodyParser())
  .use((ctx, next) => ctx.router.routes()(ctx, next))
  .use((ctx, next) => ctx.router.allowedMethods()(ctx, next))
  .listen(port, () => {
    console.log(`API running on port: ${port}`)
  });
