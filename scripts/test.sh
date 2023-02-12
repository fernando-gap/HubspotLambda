#! /usr/bin/env bash
set -eo pipefail
bucket=$(aws s3 ls | grep hubspot-app | awk '{ print "s3://"$3 }')
aws s3 cp $1 $bucket
echo "done!"