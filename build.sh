#!/bin/sh

echo "> npm install"

npm install

echo "> cleaning"

rm -rf dist

echo "> parcel build"

npx parcel build --no-autoinstall src/index.html

echo "> making build dir"

rm -rf build
mkdir build

echo "> making sw"

node sw-build.js

echo "> building sw"

npx parcel build build/sw.js