#!/bin/sh

# Example uses
# sh deploy-test.sh
# sh deploy-test.sh build
# sh deploy-test.sh deploy

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

build() {
  git pull origin master &&
  rm -rf node_modules &&
  npm install &&
  npm run build-test
}

deploy() {
  git commit -am "Test Distribution build from $USER on $date" &&
  git push origin master &&
  git push test master
}

if test "$1" = "build"; then
  build
elif test "$1" = "deploy"; then
  deploy
else
  build && deploy
fi

uploadMin && uploadMap
