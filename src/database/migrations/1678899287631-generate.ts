import { MigrationInterface, QueryRunner } from "typeorm";

export class generate1678899287631 implements MigrationInterface {
    name = 'generate1678899287631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`business_profile\` ADD \`tenant_key\` varchar(80) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`business_profile\` ADD UNIQUE INDEX \`IDX_ee376fdf49d13c5104080791f7\` (\`tenant_key\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`business_profile\` DROP INDEX \`IDX_ee376fdf49d13c5104080791f7\``);
        await queryRunner.query(`ALTER TABLE \`business_profile\` DROP COLUMN \`tenant_key\``);
    }

}
