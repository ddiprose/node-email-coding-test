# Node.JS Email Coding Test

This Node.JS app is meant to showcase:

- A REST api with a route to handle sending emails, with input validation.
- An abstraction for sending emails to different providers (currently SendGrid is implemented, using an interface that can handle a generic email payload).
- An implementation of failover for the email provider abstraction.

## Description

The demo is hosted on firebase as a serverless function. The code is written as a koa app, which firebase is able to use as a serverless app as koa exposes a callback method that implements a node request/reponse handler for itself.

The code is written to incorporate good software development practises and with maintainability in mind. For example, depending on interfaces rather that implementations. This would allow the app to be split up, e.g. into npm packages for example for the interfaces.

## Demo

Send a POST request to:

https://us-central1-node-email-coding-test.cloudfunctions.net/http/email/send as follows (e.g. using the curl example below, or using Postman):

```
curl -X POST \
https://us-central1-node-email-coding-test.cloudfunctions.net/http/email/send \
-H 'Content-Type: application/json' \
-d '{
  "toEmailAddresses": ["recipient@domain.com"],
  "ccEmailAddresses": [],
  "bccEmailAddresses": [],
  "fromEmailAddress": "sender@domain.com",
  "body": "hello world",
  "subject": "test email",
  "isHtml": false
}'
```

Note: if it says that it was successful, be sure to check your junk email (in case your email provider thinks it's not from the recipient or is spam).

## Local execution

To run locally as a koa app create a `.env` file with the following contents:

```
SENDGRID_API_KEY=$YOUR_SENDGRID_API_KEY
```

Then run:

```
npm install
npm run build
npm start
```

You can then access the app and send the above POST request to http://localhost:3000/email/send.

## Firebase deployment

To deploy to firebase first install the firebase cli: `npm install -g firebase`.

You will then need to create an app and firebase function within firebase, and login using the cli.

Next export the environment variable for your sendgrid key:

```
firebase functions:config:set envs.sendgrid_api_key=$YOUR_SENDGRID_API_KEY
```

Then use `firebase deploy` to deploy your function.

To run locally, retrieve and save the firebase config:

```
firebase functions:config:get > .runtimeconfig.json
```

Then run using `firebase serve`. After this, you can post your request to:

`http://localhost:5000/node-email-coding-test/us-central1/http/email/send`

## Tests

To run the tests, use `npm test`.

## TODO

- Add more tests.
- Add a swagger ui.
- Add better validation (i.e. should require at least one of to/cc/bcc email addresses).
- Check that failover occurs for all applicable errors (although it should work for timeouts, need to check the SendGrid docs to make sure it handles any additional errors).
