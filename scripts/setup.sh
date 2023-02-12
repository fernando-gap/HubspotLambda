#! /usr/bin/env bash
set -eo pipefail

mkdir -p './lib/nodejs'
cp 'package.json' './lib/nodejs'
npm --prefix './lib/nodejs' install --omit=dev './lib/nodejs'
rm './lib/nodejs/package.json'
