#!/bin/bash
set -e

args=("$@")

case $1 in
    build-assets)
        yarn run compile-assets
        ;;
    run)
        if [ -n "$BUILD_ASSETS_ON_LAUNCH" ]; then yarn run compile-assets; fi;
        node src/server.js
        ;;
    develop-run)
        echo "Not implemented yet"
        ;;
esac
