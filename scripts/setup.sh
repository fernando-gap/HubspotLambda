#! /usr/bin/env bash
set -eo pipefail

# Create samconfig.toml
if [ -e .env ];
then
  IFS='='
  read -a token <<< $(cat '.env')
  value=$(printf "%q" "${token[1]}")
  variable="HubspotToken = ${token[1]}"
  p="parameter_overrides = \"HubspotToken=$value\""

  # It is need to configure lambda template
  mkdir -p './lib/nodejs'
  cp 'package.json' './lib/nodejs'
  npm --prefix './lib/nodejs' install --omit=dev './lib/nodejs'
  rm './lib/nodejs/package.json'

  # Create samconfig.toml
  echo -n "" > samconfig.toml
  echo "version=0.1" >> samconfig.toml
  echo "[default.deploy.parameters]" >> samconfig.toml
  echo "stack_name = hubspot-app" >> samconfig.toml
  echo "$variable" >> samconfig.toml
  echo "$p" >> samconfig.toml
fi

