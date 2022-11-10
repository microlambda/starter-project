"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var questions = [
    {
        type: "input",
        name: "name",
        message: "Your service name (e.g. sources)",
        validate: function (input) {
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
exports.default = questions;
