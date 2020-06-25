#!/bin/sh

echo "> npm install"

npm install

echo "> cleaning"

rm -rf dist

echo "> doing favicon stuff"

rm -rf build1
cp src build1 -r

npx real-favicon generate faviconDescription.json faviconData.json build1

npx real-favicon inject faviconData.json build1 src/index.html

echo "> parcel build"

npx parcel build --no-autoinstall build1/index.html

echo "> making sw"

rm -rf build2
mkdir build2

node sw-build.js

echo "> building sw"

npx parcel build build2/sw.js
