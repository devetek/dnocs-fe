#!/bin/bash

export VITE_ENVIRONMENT="beta"
export VITE_FRONTEND="https://dnocs-v3.beta.devetek.app"
export VITE_BACKEND="https://pawon-beta.terpusat.com"
export VERSION=$(git rev-parse --short HEAD)

node ./.build-${VERSION}/server/index.mjs