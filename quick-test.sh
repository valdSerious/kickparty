#!/bin/sh

# This file assumes that you do not need to pull from origin or install any dependencies
# We will still run a build

date=`date +%Y-%m-%d@%H:%M`
export env $(cat .env | xargs)

uploadMin() {
  authstring="$RG_USERNAME:$RG_PSWD"
  mappath="file=@$(pwd)/public/static/bundle.min.js"
  urlpath="url=https://test.kickparty.com/static/bundle.min.js"
  endpoint="https://app.raygun.io/upload/jssymbols/jcxls2"
  minUploadCmd="curl -X POST -u $authstring -F $urlpath -F $mappath $endpoint"
  eval $minUploadCmd
}

uploadMap() {
  authstring="$RG_USERNAME:$RG_PSWD"
  mappath="file=@$(pwd)/public/static/bundle.min.js.map"
  urlpath="url=https://test.kickparty.com/static/bundle.min.js.map"
  endpoint="https://app.raygun.io/upload/jssymbols/jcxls2"
  mapUploadCmd="curl -X POST -u $authstring -F $urlpath -F $mappath $endpoint"
  eval $mapUploadCmd
}

npm test &&
npm run build-test &&
git commit -am "Test Distribution build from $USER on $date" &&
git push origin master &&
git push test master

uploadMin && uploadMap
