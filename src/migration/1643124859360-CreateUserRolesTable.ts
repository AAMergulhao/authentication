import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserRolesTable1643124859360 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            create table if not exists user_roles(
                userId bigint unsigned not null,
                roleId bigint unsigned not null,
                primary key(userId, roleId),
                foreign key(userId) references user(id) on delete cascade on update cascade,
                foreign key(roleId) references role(id) on delete cascade on update cascade
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_roles");
  }
}
