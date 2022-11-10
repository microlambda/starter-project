import { ApiHandlerEvent, handle, middleware } from '@my-app/middleware';
import { Handler } from 'aws-lambda';

void middleware();

export const handler: Handler = handle(async (event: ApiHandlerEvent) => {
  return `Hello ${event.queryStringParameters.name || 'World'} !`
});
