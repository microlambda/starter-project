import { aws } from '@microlambda/aws';

(async () => {
  try {
    const region = process.env.AWS_REGION;
    await aws.s3.emptyBucket({ region, bucket: `my-app-deployments-bucket-${region}` });
    await aws.cloudformation.removeStack({
      region,
      stackName: 'my-app-shared-infra',
    });
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
