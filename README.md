KickParty [![Build Status](https://travis-ci.com/elevateblue/kickparty-web.svg?token=ePsoV43ezALGcYfvHCCC&branch=master)](https://travis-ci.com/elevateblue/kickparty-web)
====

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Getting Started

### 1. Fork this repository into your GitHub account

### 2. Clone your fork of the repo locally to your computer

```sh
git clone git@github.com:YOUR_ACCOUNT/kickparty-web.git
```

### 3. Install the project dependencies (this takes some time)

```sh
npm install
```

### 4. Start app

You can run the app using many different api endpoints just by using a different npm script.

Point at production api

```sh
npm start
```

Point at the test api

```sh
npm run dev
```

Point at your locally running api

```sh
npm run local
```

## Deploying

All deployments should be done from the `elevateblue/kickparty-web master` branch.  This should NOT be your working code repository.  A plague on those who deploy from their own branches.  All deployments should be done via the deploy shell scripts.  There is a script for each environment.  By using this we ensure that we have a single step release and that step is the same for everyone every time. The scripts will pull from GH, delete the `node_modules`, re-install everything, run our tests, build the project, then push the code to Heroku. Any failure in the process will kill the deployment. Under no circumstances is it ever ok to skip steps in this process.  Just don't even touch the deploy scripts please.  The extra few minutes it will take are worth it to avoid sending errors to Staging or Production.

This has only been tested on OS X operating systems.

The following assumes that `test` and `prod` have been been added as a remotes  to your git config.  This also assumes that you have setup SSH keys for you account on Heroku.  If you have not done that try [this](https://devcenter.heroku.com/articles/keys)  Use the following commands in your terminal at the root of the project to add the KP Heroku apps and remotes:

```sh
git remote add test git@heroku.com:kickparty-test.git
git remote add production git@heroku.com:kickparty.git
```

### Deploy to Test

[Test KickParty](https://test.kickparty.com)

This is our test environment that uses basically the same servers as production but it consumes the test api endpoint.  Code deployed here is not optimized to allow for better error tracking.

```sh
sh deploy-test.sh
```

### Deploy to Production

[KickParty](https://kickparty.com)

This is our live code that customers will see and touch.  Don't break production... Seriously, don't do it (I am now destined to break PROD now... GEEESH)  Always push code and test in staging first.  When we deploy to Heroku, the script will auto bump the version and the git tag.  There are 3 ways to deploy; the first is the only one you should be doing though.  Code here is minified and uglified.

Default: Patch version bump
```sh
sh deploy-prod.sh
```

ASK FIRST: Minor version bump
```sh
sh deploy-prod.sh minor
```

ASK FIRST: Major version bump
```sh
sh deploy-prod.sh major
```


## Contributions

All code contributed must pass linting using the StandardJS rules.  To verify your change passes our tests, run `npm test`.  Once passing you can then proceed to submit a pull request via GitHub.  You are expected to resolve all conflicts for your prosed change.  All PRs with conflicts will not be merged until the author fixes them.

## API

Use the following command to view API requests:

```sh
heroku logs -a kickparty-api-test --tail
```
