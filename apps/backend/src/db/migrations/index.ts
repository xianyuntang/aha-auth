import { MigrationObject } from '@mikro-orm/core';
import { Migration } from '@mikro-orm/migrations';
import { ClassConstructor } from 'class-transformer';

import { Migration20240608165456_AddUserTable } from './Migration20240608165456_AddUserTable';
import { Migration20240714034318_AddVerifiedField } from './Migration20240714034318_AddVerifiedField';

const migrationClasses: ClassConstructor<Migration>[] = [
  Migration20240608165456_AddUserTable,
  Migration20240714034318_AddVerifiedField,
];

export const migrationsList: MigrationObject[] = migrationClasses.map(
  (migrationClass) => ({ name: migrationClass.name, class: migrationClass })
);
