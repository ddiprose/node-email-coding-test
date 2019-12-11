import { SendGridQuery } from "./query/sendgrid-query";
import { IEmailQuery, IEmailPayload } from "./types/types";

(async () => {

  const payload: IEmailPayload = {
    toEmailAddresses: [],
    ccEmailAddresses: [],
    bccEmailAddresses: [],
    body: '',
    subject: '',
    isHtml: false    
  };

  const query: IEmailQuery = new SendGridQuery();
  return await query.execute(payload)
    .then(res => {
      console.log('success', res);
    }).catch(err => {
      console.log('error', err);
      throw err;
    });

})();