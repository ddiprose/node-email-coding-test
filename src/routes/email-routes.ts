import { ILogger, IEmailQuery, IRoute } from "../types/types";
import { EmailApi } from "../api/email";

export class EmailRoutes {

  constructor(
    private _logger: ILogger,
    private _emailQueryImplementations: IEmailQuery[]) {
  }

  getRoutes(): IRoute[] {
    const emailApi = new EmailApi(this._logger, this._emailQueryImplementations);
    return [{
      type: 'post',
      uri: '/email/send',
      handler: emailApi.sendEmail
    }];
  }
}
