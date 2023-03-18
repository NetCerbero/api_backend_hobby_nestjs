import { MigrationInterface, QueryRunner } from "typeorm";

export class generate1679164449489 implements MigrationInterface {
    name = 'generate1679164449489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_account\` CHANGE \`is_admin\` \`type\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user_account\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`user_account\` ADD \`type\` varchar(20) NOT NULL DEFAULT 'BUSINESS'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_account\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`user_account\` ADD \`type\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user_account\` CHANGE \`type\` \`is_admin\` tinyint NOT NULL DEFAULT '0'`);
    }

}
