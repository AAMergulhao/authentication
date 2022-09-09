import { MigrationInterface, QueryRunner } from "typeorm";

export class InserAdminRole1657409459287 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('INSERT INTO role(`name`) VALUES ("ADMIN")');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM role WHERE name="ADMIN"');
  }

}
