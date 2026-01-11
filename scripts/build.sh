#!/bin/bash

# TODO: Create '@dpanel/vite-plugin-tanstack-start' for better approach

export NODE_OPTIONS="--max-old-space-size=1536"

# remove previous .env file, but ignore error if not exists
rm -f .env | true

# Copy env example to .env before implement dPanel env variables
mv .env.example .env

# BUILD_DIR=".dpanel"
# CURRENT_VERSION=$(cat version)
# NEXT_VERSION=".build-$(git rev-parse --short HEAD)"


echo ">>>>> Installing dependencies <<<<<"
pnpm install --frozen-lockfile # install all dependencies

echo ">>>>> Running Build <<<<<"
pnpm run build || exit 2

# echo ">>>>> Move output directory to next version folder <<<<<"
# mv .output ${NEXT_VERSION}

# echo ">>>>> Create Version Control <<<<<"
# cat version | xargs rm -rf
# echo ${NEXT_VERSION} > version