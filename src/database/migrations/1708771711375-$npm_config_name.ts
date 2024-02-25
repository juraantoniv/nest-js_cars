import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1708771711375 implements MigrationInterface {
    name = ' $npmConfigName1708771711375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usersData" ADD "city" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usersData" DROP COLUMN "city"`);
    }

}
