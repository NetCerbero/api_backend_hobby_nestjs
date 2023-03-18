import { MigrationInterface, QueryRunner } from "typeorm";

export class generate1678990763037 implements MigrationInterface {
    name = 'generate1678990763037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sale_product_branch\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`stock\` int NOT NULL DEFAULT '0', \`price\` decimal(16,2) NOT NULL DEFAULT '0.00', \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`branch_id\` bigint NOT NULL, \`product_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`sale_product_branch\` ADD CONSTRAINT \`FK_e84fb8568d0815aa9dccb11977d\` FOREIGN KEY (\`branch_id\`) REFERENCES \`business_branch\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale_product_branch\` ADD CONSTRAINT \`FK_f28c2a4aeac9fba9c2135799b51\` FOREIGN KEY (\`product_id\`) REFERENCES \`sale_product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sale_product_branch\` DROP FOREIGN KEY \`FK_f28c2a4aeac9fba9c2135799b51\``);
        await queryRunner.query(`ALTER TABLE \`sale_product_branch\` DROP FOREIGN KEY \`FK_e84fb8568d0815aa9dccb11977d\``);
        await queryRunner.query(`DROP TABLE \`sale_product_branch\``);
    }

}
