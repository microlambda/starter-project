import { Construct } from "constructs";
import { App, S3Backend, TerraformOutput, TerraformStack } from "cdktf";
import { AwsProvider } from "./.gen/providers/aws/provider";
import { S3Bucket } from "./.gen/providers/aws/s3-bucket";
import {DefaultTags} from "../default-tags";

/*
This is infra shared between environments and services
 */
class SharedInfrastructure extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    new AwsProvider(this, "aws", {
      region: "eu-west-1",
    });

    new S3Backend(this, {
      bucket: 'my-app-cdktf-remote-backend',
      key: 'shared'
    });

    const bucket = new S3Bucket(this, 'my-app-remote-backend-s3-bucket', {
      bucket: 'my-app-cdktf-remote-backend',
      tags: {
        ...DefaultTags,
        Description: 'Bucket used as remote backend by Cloud Development Kit for Terraform for my-app project',
      }
    });

    new TerraformOutput(this, 'S3 arn', {
      value: bucket.arn,
    });

  }
}

const app = new App();
new SharedInfrastructure(app, "my-app-shared-infra");
app.synth();
