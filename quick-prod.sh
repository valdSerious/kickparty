#!/bin/sh

# This file assumes that you do not need to pull from origin or install any dependencies
# It can only be executed as a version patch
# We will still run a build

# Example
# Patch: sh quick-prod.sh

date=`date +%Y-%m-%d@%H:%M`

bumpVersion() {
  bumpType="patch"
  VERSION=$(npm version $bumpType -m "$USER bumped the version to %s for deployment to production on $date")
  echo "Version bumped to" $VERSION
  git push origin --tag
  git push production --tag
}

npm run build-production &&
git commit -am "Production Distribution Build from $USER on $date" &&
bumpVersion $1 &&
git push origin master
git push production master
