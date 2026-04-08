#!/bin/bash

export VERSION=$(git rev-parse --short HEAD)

node ./.build-${VERSION}/server/index.mjs