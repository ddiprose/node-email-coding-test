#!/usr/bin/env bash
pretty_print="node node_modules/pino-pretty/bin.js -c -t"

node dist/index-node.js | $pretty_print