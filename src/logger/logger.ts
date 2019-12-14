import { default as Pino } from 'pino';
import { ILogger, LogLevel } from '../types/types';

export class Logger implements ILogger {
  _logger: Pino.Logger;

  constructor(logLevel: LogLevel, additionalOptions?: object) {
    const options: Pino.LoggerOptions = {
      serializers: {
        err: Pino.stdSerializers.err,
      },
      redact: [
      ],
      level: logLevel,
      useLevelLabels: true,
      base: null
    };
    this._logger = typeof additionalOptions !== 'undefined' ?
      Pino(options).child(additionalOptions) :
      Pino(options);
  }

  debug (obj, ...args) {
    this._logger.debug(obj, ...args);
  }

  info(obj, ...args) {
    this._logger.info(obj, ...args);
  }

  warn(obj, ...args) {
    this._logger.warn(obj, ...args);
  }

  error(obj, ...args) {
    this._logger.error(obj, ...args);
  }
}
