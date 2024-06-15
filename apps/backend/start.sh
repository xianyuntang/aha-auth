#!/usr/bin/env sh

node /app/migrate.js up
node /app/seed.js

exec node /app/main.js
