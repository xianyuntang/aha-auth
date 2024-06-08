import { Migration } from '@mikro-orm/migrations';

export class Migration20240608165456_AddUserTable extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "users" ("id" varchar(21) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "email" varchar(254) not null, "password" varchar(60) null, constraint "users_pkey" primary key ("id"));'
    );
    this.addSql(
      'alter table "users" add constraint "users_email_unique" unique ("email");'
    );

    this.addSql(
      'create table "sign_in_histories" ("id" varchar(21) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" varchar(21) not null, constraint "sign_in_histories_pkey" primary key ("id"));'
    );

    this.addSql(
      'create table "oauth_users" ("id" varchar(21) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" varchar(21) not null, "provider" varchar(255) not null, constraint "oauth_users_pkey" primary key ("id"));'
    );

    this.addSql(
      'create table "user_profiles" ("id" varchar(21) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" varchar(21) not null, "first_name" varchar(255) null, "last_name" varchar(255) null, constraint "user_profiles_pkey" primary key ("id"));'
    );
    this.addSql(
      'alter table "user_profiles" add constraint "user_profiles_user_id_unique" unique ("user_id");'
    );

    this.addSql(
      'alter table "sign_in_histories" add constraint "sign_in_histories_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;'
    );

    this.addSql(
      'alter table "oauth_users" add constraint "oauth_users_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;'
    );

    this.addSql(
      'alter table "user_profiles" add constraint "user_profiles_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;'
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "sign_in_histories" drop constraint "sign_in_histories_user_id_foreign";'
    );

    this.addSql(
      'alter table "oauth_users" drop constraint "oauth_users_user_id_foreign";'
    );

    this.addSql(
      'alter table "user_profiles" drop constraint "user_profiles_user_id_foreign";'
    );

    this.addSql('drop table if exists "users" cascade;');

    this.addSql('drop table if exists "sign_in_histories" cascade;');

    this.addSql('drop table if exists "oauth_users" cascade;');

    this.addSql('drop table if exists "user_profiles" cascade;');
  }
}
