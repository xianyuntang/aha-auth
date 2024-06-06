# Aha Auth

This repo contains the following components

- Aha auth website frontend & backend

## Development

Replace `<app>` with actual app name

### Microservices

Start / stop the microservices:

```bash
# Start the microservices:
./scripts/<app>/start-ms.sh

# Start and build the microservices:
./scripts/<app>/start-ms.sh --build

# Stop the microservices:
./scripts/<app>/stop-ms.sh

```

Restart the microservices, with an optional build argument:

```bash
# Restart the microservices:
./scripts/<app>/restart-ms.sh

# Restart and build the microservices:
./scripts/<app>/restart-ms.sh --build
```

### Web server

Install monorepo dependencies:

```bash
npm install
```

Run migration to setup the database:

```bash
./scripts/<app>/refresh-schema.sh
```

Serve the frontend and / or the backend:

```bash
# Frontend & backend
./scripts/<app>/serve.sh

# Frontend
./scripts/<app>/serve-frontend.sh

# Backend
./scripts/<app>/serve-backend.sh
```

Then you can see the website at http://localhost:4200/

### Database

Refresh schema (dev only):

_!!! Caution: Do not use this script on a production server !!!_

```shell
# Drop and regenerate the database schema and seed data
./scripts/<app>/refresh-schema.sh

# Optional: Regenerate the schema without seeding data
./scripts/<app>/refresh-schema.sh --no-seed
```

Migration:

```shell
# Create a new migration file
./scripts/<app>/migrate.sh create <name>

# Apply database migrations to the latest version
./scripts/<app>/migrate.sh up

# Rollback the database to the previous version
./scripts/<app>/migrate.sh down
```
