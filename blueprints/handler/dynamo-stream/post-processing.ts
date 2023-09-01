import { resolveProjectRoot } from '@microlambda/utils';
import { injector } from '@microlambda/generators';
import { join, relative } from 'path';
import { cyan } from 'chalk';

const postProcessing = async (inputs: Record<string, unknown>): Promise<void> => {
  const projectRoot = resolveProjectRoot();
  const path = join(projectRoot, (inputs.service as { specific: 'generic' | 'specific' }).specific, 'services', 'dynamodb-stream', 'src', 'register-event-types.ts');
  const resource = (inputs.service as { name: string }).name.slice(0, -1);

  const segments = resource.split('-');

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  let action: string;
  switch (inputs.type) {
    case 'INSERT':
      action = 'Created';
      break;
    case 'MODIFY':
      action = 'Modified';
      break;
    case 'REMOVE':
      action = 'Removed';
      break;
  }

  const alias = segments.map((s) => capitalizeFirstLetter(s)).join('') + action;
  const importStatement = `import * as ${alias} from './${(inputs.service as { name: string }).name}/${inputs.name}';`;
  await injector(path, 'import-event-type', importStatement);
  await injector(path, 'register-event-type', `    ${alias},`);
  const yamlPath = join((inputs.service as {root: string}).root, 'serverless.yml');
  await injector(yamlPath, 'handler-event', [
    `  ${inputs.name}:`,
    `    handler: src/handlers/events/${inputs.name}.handler`,
    `    timeout: 900`,
  ].join('\n'));
  console.info(cyan('[UPDATED]'), relative(projectRoot, yamlPath));
  console.info(cyan('[UPDATED]'), relative(projectRoot, path));
  console.info('✨ Success.');
}

export default postProcessing;
