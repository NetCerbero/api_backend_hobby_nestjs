import { MigrationInterface, QueryRunner } from "typeorm";

export class generate1678901117136 implements MigrationInterface {
    name = 'generate1678901117136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_account\` ADD \`is_admin\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_account\` DROP COLUMN \`is_admin\``);
    }

}
