
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