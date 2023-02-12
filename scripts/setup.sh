#! /usr/bin/env bash
set -eo pipefail

# Create samconfig.toml
if [ -e .env ];
then
  IFS='='
  read -a token <<< $(cat '.env')

  value=$(printf "%q" "${token[1]}")
  s3bucket="hubspot-app-$(dd if=/dev/random bs=8 count=1 2>/dev/null | od -An -tx1 | tr -d ' \t\n')"
  p_overrides="parameter_overrides = \"HubspotToken=$value AppBucketName=\\\"$s3bucket\\\"\""

  # clean up .env
  echo -n "" >  .env
  echo "TOKEN=${token[1]}" >> .env
  echo "S3BUCKET=${s3bucket}" >> .env

  # It is need to configure lambda template
  mkdir -p './lib/nodejs'
  cp 'package.json' './lib/nodejs'
  npm --prefix './lib/nodejs' install --omit=dev './lib/nodejs'
  rm './lib/nodejs/package.json'

  # Create samconfig.toml
  echo -n "" > samconfig.toml
  echo "version=0.1
[default.deploy.parameters]
stack_name = \"hubspot-app\"
HubspotToken = ${token[1]}
$p_overrides
" >> samconfig.toml

else
  echo '> TOKEN NAO EXISTE! Crie e adicione ao arquivo `.env`'
  echo '> No Formato: TOKEN="{token_hubspot_aplicativo_privado}"'
fi
