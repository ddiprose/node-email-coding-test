import { appAsMiddleWare } from './app';
import { errorHandler } from './middleware/error-handler';
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const requestId = require('@kasa/koa-request-id');

export const createApp = (options?) => {
  
  const app = new Koa()
    .use(requestId())
    .use(appAsMiddleWare)
    .use(errorHandler);

  if(!options || !options.isFirebase) {
    app.use(bodyParser());
  }

  return app
    .use((ctx, next) => ctx.router.routes()(ctx, next))
    .use((ctx, next) => ctx.router.allowedMethods()(ctx, next));
}
