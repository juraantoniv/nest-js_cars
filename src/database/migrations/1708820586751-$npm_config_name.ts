import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1708820586751 implements MigrationInterface {
    name = ' $npmConfigName1708820586751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usersData" ADD "avatar" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usersData" DROP COLUMN "avatar"`);
    }

}
