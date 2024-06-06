import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import MikroOrmConfig, { MIGRATIONS_ROOT } from '../mikro-orm.config';

export const createMigrations = async (name: string) => {
  const orm = await MikroORM.init<PostgreSqlDriver>({ ...MikroOrmConfig });
  const migrator = orm.getMigrator();
  await migrator.createMigration(MIGRATIONS_ROOT, false, false, name);
  await orm.close();
};

export const up = async () => {
  const orm = await MikroORM.init<PostgreSqlDriver>({ ...MikroOrmConfig });
  const migrator = orm.getMigrator();
  await migrator.up();
  await orm.close();
};

export const down = async () => {
  const orm = await MikroORM.init<PostgreSqlDriver>({ ...MikroOrmConfig });
  const migrator = orm.getMigrator();
  await migrator.down();
  await orm.close();
};

if (process.argv[2] === 'create') {
  void createMigrations(process.argv[3]);
} else if (process.argv[2] === 'up') {
  void up();
} else if (process.argv[2] === 'down') {
  void down();
}
