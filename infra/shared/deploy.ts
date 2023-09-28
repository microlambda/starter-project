import { aws } from '@microlambda/aws';
import {readFileSync} from "fs";
import { join } from 'path';

(async () => {
  try {
    await aws.cloudformation.deployStack({
      region: process.env.AWS_REGION,
      templateBody: readFileSync(join(__dirname, 'shared-infra-stack.yml')).toString(),
      stackName: 'my-app-shared-infra',
    })
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
