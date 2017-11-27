#!/bin/bash
set -e

args=("$@")

case $1 in
    build-assets)
        yarn run compile-assets
        ;;
    run)
        source /root/.bashrc
        node src/server.js
        ;;
    develop-run)
        echo "Not implemented yet"
        ;;
esac
