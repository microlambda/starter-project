import { QuestionCollection } from 'inquirer';
import { resolveProjectRoot } from '@microlambda/utils';
import { sync as glob } from 'fast-glob';
import { readFileSync, readJSONSync } from "fs-extra";
import { relative, dirname, join } from 'path';

const projectRoot = resolveProjectRoot();
const services: Array<{name: string, value: unknown}> = glob(`${projectRoot}/{generic,specific}/services/*/package.json`).map((manifestPath) => {
  const manifest = readJSONSync(manifestPath);
  return { name: manifest.name, value: { ...manifest, root: relative(projectRoot, dirname(manifestPath)) } }
}).filter((s) => {
  const yaml = readFileSync(join(s.value.root, 'serverless.yml'));
  return yaml.toString().includes('${blueprint:handler-http}');
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
    name: "method",
    message: "The HTTP method",
    choices: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  {
    type: "input",
    name: "path",
    message: "The HTTP path (e.g. v4/sources/{id})",
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
    message: "The handler name (e.g. update-source)",
    validate: (input: string) => {
      if (!input.length) {
        return 'this is mandatory';
      }
      return true;
    },
  }
]

export default questions;
