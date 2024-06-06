import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import MikroOrmConfig from '../mikro-orm.config';

export const createSchema = async () => {
  const orm = await MikroORM.init<PostgreSqlDriver>({ ...MikroOrmConfig });
  // const seeder = orm.getSeeder();

  await orm.close(true);
};

void createSchema();
