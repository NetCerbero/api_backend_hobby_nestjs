import { MigrationInterface, QueryRunner } from "typeorm";

export class generate1679064744146 implements MigrationInterface {
    name = 'generate1679064744146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_refresh_token\` (\`id\` varchar(36) NOT NULL, \`user_agent\` text NOT NULL, \`ip\` varchar(80) NOT NULL, \`expiration\` timestamp NOT NULL, \`created_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`user_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`sale_category\` ADD \`business_id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sale_product\` ADD \`business_id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sale_category\` ADD CONSTRAINT \`FK_92c6f149a5566394f909a85ee79\` FOREIGN KEY (\`business_id\`) REFERENCES \`business_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale_product\` ADD CONSTRAINT \`FK_5173ed537dde5e5b09b1bad87ad\` FOREIGN KEY (\`business_id\`) REFERENCES \`business_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_refresh_token\` ADD CONSTRAINT \`FK_24e64309aedf1c04d857a456dfc\` FOREIGN KEY (\`user_id\`) REFERENCES \`user_account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_refresh_token\` DROP FOREIGN KEY \`FK_24e64309aedf1c04d857a456dfc\``);
        await queryRunner.query(`ALTER TABLE \`sale_product\` DROP FOREIGN KEY \`FK_5173ed537dde5e5b09b1bad87ad\``);
        await queryRunner.query(`ALTER TABLE \`sale_category\` DROP FOREIGN KEY \`FK_92c6f149a5566394f909a85ee79\``);
        await queryRunner.query(`ALTER TABLE \`sale_product\` DROP COLUMN \`business_id\``);
        await queryRunner.query(`ALTER TABLE \`sale_category\` DROP COLUMN \`business_id\``);
        await queryRunner.query(`DROP TABLE \`user_refresh_token\``);
    }

}
