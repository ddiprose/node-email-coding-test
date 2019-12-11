import { IEmailQuery } from "../types/types";

export class MailGunQuery implements IEmailQuery {
  
  async execute(payload: any): Promise<any> {
    return 'foo';
  }

}