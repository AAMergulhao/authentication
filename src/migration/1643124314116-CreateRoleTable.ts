import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRoleTable1643124314116 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "role",
        columns: [
          {
            name: "id",
            type: "bigint",
            isPrimary: true,
            unsigned: true,
            isGenerated: true,
          },
          {
            name: "name",
            type: "varchar(200)",
            isUnique: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("role");
  }
}
