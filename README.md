<h1 align="center">my-app</h1>

<p align="center">
  <img width="150" height="150" src="https://raw.githubusercontent.com/microlambda/.github/e6430357d33bcadea731c5979c5f837afb6a9d8f/logo-blue.svg" alt="Logo"/>
</p>

my-app is a Microlambda project. Check the [documentation](https://microlambda.dev/docs) to get started.

### Build the project

You can check that the project builds using:

`yarn mila build`

This will build all packages in topological order.

Subsequent builds will use local caches.

### Run unit and functional tests

You run the automated tests using:

`yarn mila-runner run test`

This will test all packages in parallel.

### Start locally

Start the project with Microlambda UI using ``yarn start``

### Deploy to AWS

In your current terminal session, log in AWS using a keypair, SSO or exporting `AWS_PROFILE`.

> Verify you are logged in correct account using ``aws sts get-caller-identity``

Initialize remote state using ``yarn mila init``

### Create a new environment

Create a new environment using ``yarn mila envs create <env-name>``.

And choose all regions were infrastructure should be replicated.

Then perform your first deploy using ``yarn mila deploy -e <env-name>``

### Create a regional replicate

Create a replicate for an exiting environment using ``yarn mila envs create-replicate <env-name> <target-region>``.

The services will be deployed on the region and the remote state updated.

You can remove a replicate using ``yarn mila envs destroy-replicate <env-name> <target-region>``

> **Warning**: this will destroy all resources in the target region.

### Destroy an environment

Destory an existing environment using ``yarn mila envs destroy <env-name>``.

> **Warning**: this will destroy all resources related to this environment.

### Create a new microservice

Use blueprints to generate boilerplate for new services and packages using ``yarn mila generate``

### Remove a microservice

To remove a microservice which has already been deployed, use the remove command to delete services in every environment
it has been deployed.

``yarn mila remove -e <env> -s <my-service>``

Then, remove it from the codebase

```bash
rm -rf ./services/<my-service>
yarn
```

### Guides

* [Manage environment variables and secrets](https://microlambda.dev/docs/tutorial-basics/environment-variables)
* [Using custom domain](https://microlambda.dev/docs/deployments/using-custom-domains)
* [Create regional replicates](https://microlambda.dev/docs/advanced/infrastructure-replication)
* [Generate code with blueprints](https://microlambda.dev/docs/advanced/customize-blueprints)
