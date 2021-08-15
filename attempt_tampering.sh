#!/usr/bin/env bash

counter=0

while true; do
    ((counter++))
    echo "Attempts: $counter"

    rm -f config.json
    node write_config.js
    node tamper_config.js
    node read_config.js

    if [ $? -eq 0 ]; then
        break
    fi
done
