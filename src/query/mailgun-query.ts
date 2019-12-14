import { IEmailQuery, IEmailPayload, IHttpRequester, ILogger } from '../types/types';

export class MailGunQuery implements IEmailQuery {
  
  constructor(
    private _logger: ILogger,
    private _httpRequester: IHttpRequester
  ) {}

  async execute(payload: IEmailPayload): Promise<any> {
    return 'foo';
  }

}
