import { Construct } from "constructs";
import {App, LocalBackend, TerraformOutput, TerraformStack} from "cdktf";
import { AwsProvider } from "./.gen/providers/aws/provider";
import { S3Bucket } from "./.gen/providers/aws/s3-bucket";
import {DefaultTags} from "../default-tags";

class RemoteState extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    new AwsProvider(this, "aws", {
      region: "eu-west-1",
    });

    new LocalBackend(this, {});

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
new RemoteState(app, "my-app-remote-backend-bootstrap");
app.synth();
