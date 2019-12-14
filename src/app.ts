import { ILogger, IHttpRequester, IEmailQuery } from './types/types';
import { Logger } from './logger/logger';
import { HttpRequester } from './libs/requester';
import { SendGridQuery } from './query/sendgrid-query';
import { EmailRoutes } from './routes/email-routes';
import { Router } from './router/router';

export async function appAsMiddleWare(ctx, next) {
  // create dependencies
  const _logger: ILogger = new Logger('debug', {
    reqId: ctx.state.reqId
  });
  const _httpRequester: IHttpRequester = new HttpRequester(_logger);

  // get routes
  const sendGridQuery: IEmailQuery = new SendGridQuery(_logger, _httpRequester);
  const emailRoutes = new EmailRoutes(_logger, sendGridQuery);

  // create koa router and bootstrap
  const router = new Router(emailRoutes.getRoutes());
  router.bootstrap();

  // attach the router to the context so it can be set up later in the chain
  ctx.router = router.instance;
  await next();
}
