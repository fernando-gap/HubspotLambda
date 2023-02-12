#! /usr/bin/env bash
set -eo pipefail
IFS='='
BUCKET=$(cat .env | grep S3)
read -a name <<< $BUCKET
echo  "deleting bucket..."
aws s3 rb "s3://${name[1]}" --force
sam delete --stack-name "hubspot-app"