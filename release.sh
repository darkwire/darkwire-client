#! /bin/bash

set -e

if [ -z $1 ]; then
  echo "Release type is required:"
  echo "[<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]"
  echo "See https://docs.npmjs.com/cli/version"
  exit 1
fi

npm version $1

git push origin master --follow-tags

version=`git describe --abbrev=0 --tags`

echo "Tagged and pushed $version"

docker build -t darkwire/darkwire-client:${version:1} -t darkwire/darkwire-client:latest .
docker push darkwire/darkwire-client:${version:1}
docker push darkwire/darkwire-client:latest