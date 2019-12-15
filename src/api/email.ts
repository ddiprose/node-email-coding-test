import { ILogger, IEmailPayload, IEmailQuery } from '../types/types';
import { emailPayloadSchema } from '../validation/schema';

export class EmailApi {

  constructor(
    private _logger: ILogger,
    private _emailQueryImplementations: IEmailQuery[]
  ) {}

  sendEmail = async(ctx, next) => {
    const emailPayload: IEmailPayload = ctx.req.body || ctx.request.body;

    const validation = emailPayloadSchema.validate(emailPayload);
    if(validation.error) {
      this._logger.error({ err: validation.error }, 'Email payload invalid');
      ctx.throw(400, validation.error);
      return;
    }

    let error;
    try {
      // failover to the other implementation if it times out
      for(const emailQuery of this._emailQueryImplementations) {
        let result;
        try {
          result = await this.processEmailSend(emailQuery, emailPayload);
          ctx.body = result;
          return;
        } catch(err) {
          error = err;
          // if it's not a timeout, throw (e.g. bad request)
          if(typeof err.timeout === 'undefined') {
            throw err;
          }
        }
      }
    } catch(err) {
      error = err;
    }
    if(error) {
      this._logger.error({ err: error }, 'Failed to send email');
      ctx.throw(error.statusCode || 500, error.message);
    }
  }

  private processEmailSend = async (emailQuery: IEmailQuery, emailPayload: IEmailPayload) => {
    return await emailQuery.execute(emailPayload)
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
          message: `Sent email successfully from: ${emailPayload.fromEmailAddress} to recipients ${recipientsStr}`,
          response: res
        };
      });
  }
}
