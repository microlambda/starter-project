import { QuestionCollection } from 'inquirer';

const questions: QuestionCollection = [
  {
    type: "input",
    name: "name",
    message: "Your package name (e.g. sources)",
    validate: (input: string) => {
      if (input.match(/^[a-z-]+$/) == null) {
        return 'service name must follow pattern ^[a-z-]+$';
      }
      return true;
    },
  },
  {
    type: "input",
    name: "description",
    message: "Describe briefly your package",
  },
  {
    type: "list",
    name: "type",
    message: "What kind of package is it ?",
    choices: ["generic", "specific"]
  }
];

export default questions;
