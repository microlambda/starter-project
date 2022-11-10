import { App } from "cdktf";
import {DeploymentBucket} from "./deployment-bucket";

/*
This is infra shared between environments and services
 */
const app = new App();
new DeploymentBucket(app, "my-app-shared-infra");
app.synth();
