import { IEmailPayload } from '../types/types';
import Joi from '@hapi/joi';

const emailPayloadSchemaObject: IEmailPayload = {
  toEmailAddresses: Joi.array().items(Joi.string().email()),
  ccEmailAddresses: Joi.array().items(Joi.string().email()),
  bccEmailAddresses: Joi.array().items(Joi.string().email()),
  fromEmailAddress: Joi.string().email().required(),
  subject: Joi.string(),
  body: Joi.string(),
  isHtml: Joi.boolean().required()
};

export const emailPayloadSchema = Joi.object(emailPayloadSchemaObject);
