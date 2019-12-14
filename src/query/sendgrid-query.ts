import { IEmailQuery, IEmailPayload, IHttpRequester, ISendGridBodyPayload, ILogger } from '../types/types';
import { defaultHttpRequestTimeoutMilliseconds } from '../constants/constants';

export class SendGridQuery implements IEmailQuery {
  
  constructor(
    private _logger: ILogger,
    private _httpRequester: IHttpRequester
  ) {}

  async execute(payload: IEmailPayload): Promise<any> {
    const sendGridBodyPayload: ISendGridBodyPayload = {
      personalizations: [{
        to: payload.toEmailAddresses.map(x => ({ email: x })),
      }],
      from: { email: payload.fromEmailAddress },
      subject: payload.subject,
      content: [{
        type: payload.isHtml ? 'text/html' : 'text/plain',
        value: payload.body
      }]
    };
    return await this._httpRequester.request({
      uri: 'https://api.sendgrid.com/v3/mail/send',
      auth: {
        bearer: process.env.SENDGRID_API_KEY
      },
      method: 'POST',
      body: sendGridBodyPayload,
      json: true,
      timeout: defaultHttpRequestTimeoutMilliseconds,
    }).then(res => {
      this._logger.debug('Successfully sent email to SendGrid with response: %o', res || null);
      return res;
    });
  }
}
