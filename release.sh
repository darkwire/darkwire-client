#! /bin/bash
npm version $1

git push origin master --follow-tags

version=`git describe --abbrev=0 --tags`

echo "Tagged and pushed $version"

docker build -t darkwire/darkwire-client:${version:1} darkwire/darkwire-client:latest .
docker push darkwire/darkwire-client:${version:1}
docker push darkwire/darkwire-client:latest