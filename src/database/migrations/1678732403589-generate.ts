import { MigrationInterface, QueryRunner } from "typeorm";

export class generate1678732403589 implements MigrationInterface {
    name = 'generate1678732403589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`business_profile\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`tradeName\` varchar(150) NOT NULL, \`logo\` text NULL, \`created_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_account\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`email\` varchar(150) NOT NULL, \`password\` varchar(255) NOT NULL, \`display_name\` varchar(100) NOT NULL, \`photo\` text NULL, \`status\` varchar(10) NOT NULL DEFAULT 'INACTIVO', \`created_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, UNIQUE INDEX \`IDX_56a0e4bcec2b5411beafa47ffa\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_business_profile\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`default\` tinyint NOT NULL DEFAULT 0, \`created_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userAccountId\` int NOT NULL, \`businessProfileId\` int NOT NULL, \`user_account_id\` bigint NULL, \`business_profile_id\` bigint NULL, PRIMARY KEY (\`id\`, \`userAccountId\`, \`businessProfileId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_business_branch\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`default\` tinyint NOT NULL DEFAULT 0, \`created_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userAccountId\` int NOT NULL, \`businessBranchId\` int NOT NULL, \`user_account_id\` bigint NULL, \`business_branch_id\` bigint NULL, PRIMARY KEY (\`id\`, \`userAccountId\`, \`businessBranchId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`business_location\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`default\` tinyint NOT NULL DEFAULT 0, \`created_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`business_branch\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`address\` varchar(200) NULL, \`created_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`business_id\` bigint NOT NULL, \`location_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` ADD CONSTRAINT \`FK_7c2a8f0c5e752a74f4657f77a79\` FOREIGN KEY (\`user_account_id\`) REFERENCES \`user_account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` ADD CONSTRAINT \`FK_ddd27b9d02ef2643a764f7aa76d\` FOREIGN KEY (\`business_profile_id\`) REFERENCES \`business_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` ADD CONSTRAINT \`FK_cad3783b53b21a46d0e6c066cb2\` FOREIGN KEY (\`user_account_id\`) REFERENCES \`user_account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` ADD CONSTRAINT \`FK_75303bc7302fdd9a948d44bce14\` FOREIGN KEY (\`business_branch_id\`) REFERENCES \`business_branch\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`business_branch\` ADD CONSTRAINT \`FK_e926850e9490728737f54594e01\` FOREIGN KEY (\`business_id\`) REFERENCES \`business_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`business_branch\` ADD CONSTRAINT \`FK_c1ffc8d5555049f658c650703d4\` FOREIGN KEY (\`location_id\`) REFERENCES \`business_location\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`business_branch\` DROP FOREIGN KEY \`FK_c1ffc8d5555049f658c650703d4\``);
        await queryRunner.query(`ALTER TABLE \`business_branch\` DROP FOREIGN KEY \`FK_e926850e9490728737f54594e01\``);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` DROP FOREIGN KEY \`FK_75303bc7302fdd9a948d44bce14\``);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` DROP FOREIGN KEY \`FK_cad3783b53b21a46d0e6c066cb2\``);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` DROP FOREIGN KEY \`FK_ddd27b9d02ef2643a764f7aa76d\``);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` DROP FOREIGN KEY \`FK_7c2a8f0c5e752a74f4657f77a79\``);
        await queryRunner.query(`DROP TABLE \`business_branch\``);
        await queryRunner.query(`DROP TABLE \`business_location\``);
        await queryRunner.query(`DROP TABLE \`user_business_branch\``);
        await queryRunner.query(`DROP TABLE \`user_business_profile\``);
        await queryRunner.query(`DROP INDEX \`IDX_56a0e4bcec2b5411beafa47ffa\` ON \`user_account\``);
        await queryRunner.query(`DROP TABLE \`user_account\``);
        await queryRunner.query(`DROP TABLE \`business_profile\``);
    }

}
