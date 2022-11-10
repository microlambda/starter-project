import { Construct } from "constructs";
import { S3Bucket } from "./.gen/providers/aws/s3-bucket";
import {DefaultTags} from "../default-tags";
import {SsmParameter} from "./.gen/providers/aws/ssm-parameter";
import {ConfiguredStack} from "./state-config";

export class DeploymentBucket extends ConfiguredStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    new S3Bucket(this, 'my-app-deployment-bucket', {
      bucket: 'my-app-deployment-bucket',
      tags: {
        ...DefaultTags,
        Description: 'Bucket to store zipped source code for AWS Lambda',
      }
    });

    new SsmParameter(this, 'my-app-deployment-bucket-name', {
      name: '/my-app/shared/buckets/deployments',
      value: 'my-app-deployment-bucket',
      type: 'String',
      tags: {
        ...DefaultTags,
        Description: 'Bucket to store zipped source code for AWS Lambda',
      }
    });
  }
}
