import { MigrationObject } from '@mikro-orm/core';
import { Migration } from '@mikro-orm/migrations';
import { ClassConstructor } from 'class-transformer';

import { Migration20240608165456_AddUserTable } from './Migration20240608165456_AddUserTable';

const migrationClasses: ClassConstructor<Migration>[] = [
  Migration20240608165456_AddUserTable,
];

export const migrationsList: MigrationObject[] = migrationClasses.map(
  (migrationClass) => ({ name: migrationClass.name, class: migrationClass })
);
