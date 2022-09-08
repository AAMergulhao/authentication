import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1643118168748 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table if not exists user(
        id bigint unsigned not null auto_increment,
        email varchar(200) not null,
        password text not null,
        primary key(id),
        unique(email)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }
}
