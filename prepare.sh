#!/usr/bin/env sh
if [ "$NODE_ENV" != "production" ]; then
  exec husky install
fi
