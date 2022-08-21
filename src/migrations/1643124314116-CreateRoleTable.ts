import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRoleTable1643124314116 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table if not exists role(
        id bigint unsigned not null auto_increment,
        name varchar(50) not null,
        primary key(id),
        unique(name)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("role");
  }
}
