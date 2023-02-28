import { APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { after, ApiHandlerEvent, before, config, handleError, injectSecrets } from '@microlambda/handling';
import { logger } from '@my-app/logger';

export const middleware = async (): Promise<void> => {
  AWS.config.update({ region: 'eu-west-1' });
  config({ api: { cors: true, blacklist: [] } });

  const logEvent = async (event: ApiHandlerEvent): Promise<void> => {
    logger.info('Lambda triggered with event', event);
  };

  const logResponse = async (_event: ApiHandlerEvent, result: APIGatewayProxyResult): Promise<void> => {
    logger.info('Lambda exited with status code', result.statusCode);
  };

  const logError = async (event: ApiHandlerEvent, error: Error, result: APIGatewayProxyResult): Promise<void> => {
    logger.error('Uncaught error in handler execution !');
    logger.error(error);
    logger.debug('Invocation context', { event, result });
  };

  // error
  const beforeMiddlewareFunctions = [injectSecrets, logEvent]; // by default
  const afterMiddlewareFunctions = [logResponse];
  const errorMiddlewareFunctions = [logError];

  const type = 'ApiGateway';
  before(type, beforeMiddlewareFunctions);
  after(type, afterMiddlewareFunctions);
  handleError(type, errorMiddlewareFunctions);
};
