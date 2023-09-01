import { QuestionCollection } from 'inquirer';

const questions: QuestionCollection = [
  {
    type: "input",
    name: "name",
    message: "Your service name (e.g. sources)",
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
    message: "Describe briefly your service",
  },
  {
    type: "list",
    name: "type",
    message: "What kind of service is it ?",
    choices: ["generic", "specific"]
  }
];

export default questions;
