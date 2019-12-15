import { IEmailPayload, ILogger, IEmailQuery } from '../types/types';
import { Logger } from '../logger/logger';
import { EmailApi } from './email';

describe('EmailApi', function() {
  let logger: ILogger;
  let validPayload: IEmailPayload = {
    "toEmailAddresses": ["recipient@domain.com"],
    "ccEmailAddresses": [],
    "bccEmailAddresses": [],
    "fromEmailAddress": "sender@domain.com",
    "body": "hello world",
    "subject": "test email",
    "isHtml": false
  };

  beforeEach(() => {
    logger = new Logger('silent');
  });

  describe('#sendEmail', function() {
    it('should handle successful send', async function() {
      let successImplementationsSingle: IEmailQuery[] = [
        {
          execute: async(payload: IEmailPayload) => {}
        }
      ];
      const ctx: any = {
        req: {
          body: validPayload
        }
      };
      const emailApi = new EmailApi(logger, successImplementationsSingle);
      await emailApi.sendEmail(ctx, () => {});
      expect(ctx.body.status).toBe('success');
    });

    it('should handle failed send', async function() {
      const ctx: any = {
        req: {
          body: validPayload
        }
      };
      let failImplementationsSingle: IEmailQuery[] = [
        {
          execute: async(payload: IEmailPayload) => {
            throw new Error();
          }
        }
      ];
      const emailApi = new EmailApi(logger, failImplementationsSingle);
      expect.assertions(1);
      await emailApi.sendEmail(ctx, () => {}).catch(err => {
        expect(err).toBeTruthy();
      });
    });

    it('should failover on timeout', async function() {
      const ctx: any = {
        req: {
          body: validPayload
        }
      };
      let firstImplemenationTimesOut: IEmailQuery[] = [
        {
          execute: async(payload: IEmailPayload) => {
            const error: any = new Error();
            error.timeout = true;
            throw error;
          }
        },
        {
          execute: async(payload: IEmailPayload) => {}
        }
      ];
      const spy = jest.spyOn(firstImplemenationTimesOut[1], 'execute');
      const emailApi = new EmailApi(logger, firstImplemenationTimesOut);
      await emailApi.sendEmail(ctx, () => {});
      expect(spy).toBeCalled();
      expect(ctx.body.status).toBe('success');
    });

    it('should handle failure for multiple providers', async function() {
      const ctx: any = {
        req: {
          body: validPayload
        }
      };
      let firstImplemenationTimesOut: IEmailQuery[] = [
        {
          execute: async(payload: IEmailPayload) => {
            throw new Error();
          }
        },
        {
          execute: async(payload: IEmailPayload) => {
            throw new Error();
          }
        }
      ];
      const emailApi = new EmailApi(logger, firstImplemenationTimesOut);
      expect.assertions(1);
      await emailApi.sendEmail(ctx, () => {}).catch(err => {
        expect(err).toBeTruthy();
      });
    });

    it('should handle a validation error', async function() {
      const invalidPayload: IEmailPayload = {
        "toEmailAddresses": ["recipient"],
        "ccEmailAddresses": [],
        "bccEmailAddresses": [],
        "fromEmailAddress": "sender@domain.com",
        "body": "hello world",
        "subject": "test email",
        "isHtml": false
      };
      const ctx: any = {
        req: {
          body: invalidPayload
        },
        throw: () => {}
      };
      let successImplementationsSingle: IEmailQuery[] = [
        {
          execute: async(payload: IEmailPayload) => {
          }
        }
      ];
      const spy = jest.spyOn(ctx, 'throw');
      const emailApi = new EmailApi(logger, successImplementationsSingle);
      await emailApi.sendEmail(ctx, () => {});
      expect(spy).toBeCalled();
    });
  });
});
