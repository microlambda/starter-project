import { resolveProjectRoot } from '@microlambda/utils';
import { join, relative } from 'path';
import { injector } from '@microlambda/generators';
import { cyan } from 'chalk';
import { readFileSync, writeFileSync } from 'fs-extra';

const postProcessing = async (inputs: Record<string, unknown>): Promise<void> => {
  const projectRoot = resolveProjectRoot();
  const yamlPath = join(projectRoot, (inputs.service as {root: string}).root, 'serverless.yml');
  await injector(yamlPath, 'handler-http', [
    `  ${inputs.name}:`,
    `    handler: src/handlers/http/${inputs.name}.handler`,
    `    events:`,
    `      - http:`,
    `          path: ${inputs.path}`,
    `          method: ${inputs.method.toString().toLowerCase()}`,
    '          authorizer: ${file(../../../serverless_config/authorizer-http-lambda.yml)}',
    '          cors: ${file(../../../serverless_config/cors-http-lambda.yml)}',
  ].join('\n'));

  console.info(cyan('[UPDATED]'), relative(projectRoot, yamlPath));

  const yamlOpenAPIPath = join(projectRoot, (inputs.service as {root: string}).root, 'reference', (inputs.service as {root: string}).root.split('/').slice(-1)[0] + '.v4.yaml');

  const handlerDocumentationAPI = [
    `  /${inputs.path as string}:`,
    `    ${inputs.method.toString().toLowerCase()}:`,
    `      summary: TODO`,
    `      operationId: ${inputs.method.toString().toLowerCase()}-${(inputs.path as string).replaceAll('/', '-').replaceAll('{', '').replaceAll('}', '')}`,
    `      responses:`,
    `        '200':`,
    '          description: TODO',
    '          content:',
    '            TODO',
  ].join('\n');

  if( readFileSync(yamlOpenAPIPath).toString().includes(inputs.path as string)){
    const file = readFileSync(yamlOpenAPIPath, 'utf-8')
    writeFileSync(yamlOpenAPIPath, file.replace('/' + inputs.path as string, handlerDocumentationAPI));
  }
  else{
    await injector(yamlOpenAPIPath, 'openapi-handler-http', handlerDocumentationAPI);
  }
  console.info(cyan('[UPDATED]'), relative(projectRoot, yamlOpenAPIPath));
  console.info('✨ Success.');
}

export default postProcessing
