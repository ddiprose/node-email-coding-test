import { SendGridQuery } from './query/sendgrid-query';
import { IEmailQuery, IEmailPayload, ILogger, IHttpRequester } from './types/types';
import { Logger } from './logger/logger';
import { HttpRequester } from './libs/requester';

(async () => {

  // load .env file
  require('dotenv').config();

  // create dependencies
  const _logger: ILogger = new Logger('debug');
  const _httpRequester: IHttpRequester = new HttpRequester(_logger);

  const payload: IEmailPayload = {
    toEmailAddresses: [],
    ccEmailAddresses: [],
    bccEmailAddresses: [],
    fromEmailAddress: '',
    body: 'hello world',
    subject: 'test email',
    isHtml: false
  };

  const query: IEmailQuery = new SendGridQuery(_logger, _httpRequester);
  return await query.execute(payload)
    .then(res => {
      _logger.info('Successfully sent email')
    }).catch(err => {
      _logger.error({ err }, 'Failed to send email');
      process.exit(1);
    });

})();