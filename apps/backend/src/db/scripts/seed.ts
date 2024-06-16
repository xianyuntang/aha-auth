import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import MikroOrmConfig from '../mikro-orm.config';
import { UserSeeder } from '../seeders/prod/user.seeder';

export const createSchema = async () => {
  const orm = await MikroORM.init<PostgreSqlDriver>({ ...MikroOrmConfig });
  const seeder = orm.getSeeder();
  await seeder.seed(UserSeeder);

  await orm.close(true);
};

void createSchema();
