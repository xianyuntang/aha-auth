import { Migrator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';
import dotenv from 'dotenv';
import path from 'path';

import { PROJECT_ROOT } from '../app';
import * as entities from './entities';
import { migrationsList } from './migrations';

export const MIGRATIONS_ROOT = path.resolve(
  PROJECT_ROOT,
  'src',
  'db',
  'migrations'
);
dotenv.config({
  path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}.local`),
});
dotenv.config({
  path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`),
});
const config = defineConfig({
  debug: true,
  extensions: [Migrator, SeedManager],
  entities: [...Object.values(entities)],
  host: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  port: parseInt(process.env.DB_PORT!),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  migrations: {
    path: MIGRATIONS_ROOT, // path to the folder with migrations
    migrationsList,
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    snapshot: false, // save snapshot when creating new migrations
    emit: 'ts', // migration generation mode
  },
  schemaGenerator: {
    createForeignKeyConstraints: true,
  },
});
export default config;
