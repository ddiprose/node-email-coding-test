import { IEmailQuery, IEmailPayload, IHttpRequester, ILogger } from '../types/types';

export class MailGunQuery implements IEmailQuery {
  
  constructor(
    private _logger: ILogger,
    private _httpRequester: IHttpRequester
  ) {}

  async execute(payload: IEmailPayload): Promise<any> {
    return {
      message: `We didn't actually send an email since SendGrid timed out. This is the failover implementation response.`
    };
  }

}
