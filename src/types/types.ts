import { LogFn, LevelWithSilent } from 'pino';

export interface IRoute {
  type: 'get' | 'post' | 'put' | 'delete';
  uri: string;
  handler: (ctx, next) => Promise<any>; 
}

export interface IEmailQuery {
  execute(payload: IEmailPayload): Promise<any>;
}

export interface IEmailPayload {
  toEmailAddresses: string[];
  ccEmailAddresses: string[];
  bccEmailAddresses: string[];
  fromEmailAddress: string;
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

// send grid payload
export interface ISendGridBodyPayload {
  personalizations: { to: { email: string }[] }[];
  from: { email: string };
  subject: string;
  content: { type: 'text/plain' | 'text/html', value: string; }[];
}
