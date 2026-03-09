#!/bin/bash

# remove previous .env file, but ignore error if not exists
rm -f .env | true

# Copy env example to .env before implement dPanel env variables
mv .env.example .env

# Check condition, to determine build new or not
CURRENT_VERSION=""
if [ -f "version" ]; then
    CURRENT_VERSION=$(cat version)
fi
NEXT_VERSION=$(git rev-parse --short HEAD)


# expose as environment variable for build process
export BUILD_DIR=".build-${NEXT_VERSION}"

# Skip build if no changes version
if [[ "${NEXT_VERSION}" != "${CURRENT_VERSION}" ]]; then
    echo ">>>>> Installing dependencies <<<<<"
    pnpm install --frozen-lockfile # install all dependencies

    echo ">>>>> Running Build <<<<<"
    pnpm run build || exit 2
    
    echo ">>>>> Create Version Control <<<<<"
    cat version | xargs rm -rf
    echo ${NEXT_VERSION} > version

    echo ">>>>> Create Version Control <<<<<"
    cat version | xargs rm -rf
    echo ${NEXT_VERSION} > version

    echo ">>>>> Copy current version to .output <<<<<"
    if [ -d ".output" ]; then
        cp -rf ${BUILD_DIR}/* .output
    else
        cp -rf ${BUILD_DIR} .output
    fi

    echo ">>>>> Cleanup previous version <<<<<"
    # Refetch current version
    NEXT_VERSION=$(cat version)

    # Delete temporary build folder
    rm -rf .build-*
fi

if [[ "${NEXT_VERSION}" == "${CURRENT_VERSION}" ]]; then
    echo "Skip build, no commit changes detected, please push new commit to trigger a build!"
fi