import { LogFn, LevelWithSilent } from "pino";

export interface IEmailQuery {
  execute(payload): Promise<any>;
}

export interface IEmailPayload {
  toEmailAddresses: string[];
  ccEmailAddresses: string[];
  bccEmailAddresses: string[];
  subject: string;
  body: string;
  isHtml: boolean;
}

export interface ILogger {
  debug: LogFn;
  info: LogFn;
  warn: LogFn;
  error: LogFn;
}

export type LogLevel = LevelWithSilent;

export interface IHttpRequester {
  request(options: IRequestOptions): Promise<any>;
}

export interface IRequestOptions {
  uri: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  auth?: any;
  headers?: any;
  body?: any;
  json: boolean
  strictSSL?: boolean;
  timeout: number;
}