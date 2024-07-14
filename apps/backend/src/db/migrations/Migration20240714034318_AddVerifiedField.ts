import { Migration } from '@mikro-orm/migrations';

export class Migration20240714034318_AddVerifiedField extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "users" add column "verified" boolean not null default false;'
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop column "verified";');
  }
}
