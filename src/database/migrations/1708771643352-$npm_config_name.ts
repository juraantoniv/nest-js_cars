import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1708771643352 implements MigrationInterface {
    name = ' $npmConfigName1708771643352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usersData" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" text, "email" text NOT NULL, "password" text NOT NULL, "age" integer, CONSTRAINT "PK_a782923b6bde291eda538779666" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usersData"`);
    }

}
