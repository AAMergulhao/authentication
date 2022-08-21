import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertStandardRole1657547845473 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('INSERT INTO role(`name`) VALUES ("STANDARD")')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM role WHERE name="STANDARD"')
    }
}