import { ILogger, IEmailPayload, IEmailQuery } from '../types/types';

export class EmailApi {

  constructor(
    private _logger: ILogger,
    private _emailQuery: IEmailQuery
  ) {}

  sendEmail = async(ctx, next) => {
    const emailPayload: IEmailPayload = ctx.request.body;

    ctx.body = await this._emailQuery.execute(emailPayload)
      .then(res => {
        this._logger.info('Sent email successfully with response: %o', res || null);
        const recipientsObj = {
          ...(emailPayload.toEmailAddresses.length > 0 ? { to: emailPayload.toEmailAddresses }: undefined),
          ...(emailPayload.ccEmailAddresses.length > 0 ? { cc: emailPayload.ccEmailAddresses }: undefined),
          ...(emailPayload.bccEmailAddresses.length > 0 ? { bcc: emailPayload.bccEmailAddresses }: undefined),
        };
        const recipientsStr = Object.keys(recipientsObj).map(key => `${key}: ${recipientsObj[key].join(', ')}`).join('; ');
        return {
          status: 'success',
          message: `Sent email successfully from: ${emailPayload.fromEmailAddress} to recipients ${recipientsStr}`
        };
      }).catch(err => {
        this._logger.error({ err }, 'Failed to send email');
        ctx.throw(err.statusCode, err.message);
      });
  }
}


