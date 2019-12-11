import request from 'request-promise-native';
import { IRequestOptions, ILogger, IHttpRequester } from '../types/types';

export class HttpRequester implements IHttpRequester {
  constructor(
    private _logger: ILogger
  ) {}

  async request(options: IRequestOptions): Promise<any> {
    this._logger.debug.apply(this, [
      `Calling ${options.method} ${options.uri}` +
        (options.body ? ` with payload: %o` : ''),
      ...(options.body ? [options.body] : [])
    ]);
    return await request(options).catch(err => {
      if(err.error && (err.error.code === 'ESOCKETTIMEDOUT' || err.error.code === 'ETIMEDOUT')) {
        this._logger.debug(`Failed to call ${options.method} ${options.uri} as elapsed time exceeded ${options.timeout} milliseconds`);
      }
      throw err;
    });
  }
}