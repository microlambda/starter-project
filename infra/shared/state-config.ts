import { Construct } from "constructs";
import { S3Backend, TerraformStack } from "cdktf";
import { AwsProvider } from "./.gen/providers/aws/provider";

export class ConfiguredStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    new AwsProvider(this, "aws", {
      region: "eu-west-1",
    });

    new S3Backend(this, {
      bucket: 'my-app-cdktf-remote-backend',
      key: 'shared',
      region: 'eu-west-1'
    });
  }
}
