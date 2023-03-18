import { MigrationInterface, QueryRunner } from "typeorm";

export class generate1678989253040 implements MigrationInterface {
    name = 'generate1678989253040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sale_category\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`order\` int NOT NULL DEFAULT '0', \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`parent_id\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sale_product\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`photo\` text NULL, \`display_name\` varchar(150) NOT NULL, \`sku\` varchar(100) NULL, \`description\` varchar(100) NULL, \`type\` varchar(20) NOT NULL DEFAULT 'ALMACENABLE', \`is_active\` tinyint NOT NULL DEFAULT 1, \`can_be_sold\` tinyint NOT NULL DEFAULT 1, \`can_be_bought\` tinyint NOT NULL DEFAULT 1, \`created_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`category_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`sale_category\` ADD CONSTRAINT \`FK_53b22e1138b224885c090119308\` FOREIGN KEY (\`parent_id\`) REFERENCES \`sale_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale_product\` ADD CONSTRAINT \`FK_9c2e5d24ef6a57d40dfbd060640\` FOREIGN KEY (\`category_id\`) REFERENCES \`sale_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sale_product\` DROP FOREIGN KEY \`FK_9c2e5d24ef6a57d40dfbd060640\``);
        await queryRunner.query(`ALTER TABLE \`sale_category\` DROP FOREIGN KEY \`FK_53b22e1138b224885c090119308\``);
        await queryRunner.query(`DROP TABLE \`sale_product\``);
        await queryRunner.query(`DROP TABLE \`sale_category\``);
    }

}
