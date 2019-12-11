import { IEmailQuery } from "../types/types";

export class SendGridQuery implements IEmailQuery {
  
  async execute(payload: any): Promise<any> {
    return 'foo';
  }

}