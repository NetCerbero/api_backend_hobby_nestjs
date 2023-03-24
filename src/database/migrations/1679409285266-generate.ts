import { MigrationInterface, QueryRunner } from "typeorm";

export class generate1679409285266 implements MigrationInterface {
    name = 'generate1679409285266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sale_product\` CHANGE \`description\` \`short_description\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`sale_product\` DROP COLUMN \`short_description\``);
        await queryRunner.query(`ALTER TABLE \`sale_product\` ADD \`short_description\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sale_product\` DROP COLUMN \`short_description\``);
        await queryRunner.query(`ALTER TABLE \`sale_product\` ADD \`short_description\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`sale_product\` CHANGE \`short_description\` \`description\` varchar(100) NULL`);
    }

}
