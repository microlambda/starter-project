import { QuestionCollection } from 'inquirer';
import { resolveProjectRoot } from '@microlambda/utils';
import { sync as glob } from 'fast-glob';
import { readFileSync, readJSONSync } from "fs-extra";
import { relative, dirname, join } from "path";

const projectRoot = resolveProjectRoot();
const services: Array<{name: string, value: unknown}> = glob(`${projectRoot}/{generic,specific}/services/*/package.json`).map((manifestPath) => {
  const manifest = readJSONSync(manifestPath);
  const hasScope = manifest.name.startsWith('@');
  const scope = hasScope ? manifest.name.split('/')[0] : undefined;
  const name = hasScope ? manifest.name.split('/')[1] : manifest.name;
  return { name: manifest.name, value: { ...manifest, name, scope, specific: scope === '@dataportal-pr' ? 'specific' : 'generic', root: relative(projectRoot, dirname(manifestPath)) } }
}).filter((s) => {
  const yaml = readFileSync(join(s.value.root, 'serverless.yml'));
  return yaml.toString().includes('${blueprint:handler-event}');
});

const questions: QuestionCollection = [
  {
    type: "list",
    name: "service",
    message: "The service where you want to generate the handler",
    choices: services,
  },
  {
    type: "list",
    name: "type",
    message: "The DynamoDB event type",
    choices: ['INSERT', 'MODIFY', 'REMOVE'],
  },
  {
    type: "list",
    name: "keyConditionType",
    message: "The key condition type",
    choices: ['equals', 'startsWith'],
  },
  {
    type: "input",
    name: "keyCondition",
    message: "The key condition (e.g sources|favorites|)",
    validate: (input: string) => {
      if (!input.length) {
        return 'this is mandatory';
      }
      return true;
    },
  },
  {
    type: "input",
    name: "name",
    message: "The handler name (e.g. source-updated)",
    validate: (input: string) => {
      if (!input.length) {
        return 'this is mandatory';
      }
      return true;
    },
  }
]

export default questions;
