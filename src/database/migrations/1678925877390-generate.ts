import { MigrationInterface, QueryRunner } from "typeorm";

export class generate1678925877390 implements MigrationInterface {
    name = 'generate1678925877390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` DROP COLUMN \`businessProfileId\``);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` CHANGE \`id\` \`id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` ADD PRIMARY KEY (\`id\`, \`businessBranchId\`)`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` CHANGE \`id\` \`id\` bigint NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` DROP COLUMN \`userAccountId\``);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` CHANGE \`id\` \`id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` CHANGE \`id\` \`id\` bigint NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` DROP COLUMN \`businessBranchId\``);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` DROP FOREIGN KEY \`FK_7c2a8f0c5e752a74f4657f77a79\``);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` DROP FOREIGN KEY \`FK_ddd27b9d02ef2643a764f7aa76d\``);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` ADD \`id\` bigint NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` CHANGE \`user_account_id\` \`user_account_id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` CHANGE \`business_profile_id\` \`business_profile_id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` DROP FOREIGN KEY \`FK_cad3783b53b21a46d0e6c066cb2\``);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` DROP FOREIGN KEY \`FK_75303bc7302fdd9a948d44bce14\``);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` CHANGE \`user_account_id\` \`user_account_id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` CHANGE \`business_branch_id\` \`business_branch_id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` ADD CONSTRAINT \`FK_7c2a8f0c5e752a74f4657f77a79\` FOREIGN KEY (\`user_account_id\`) REFERENCES \`user_account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` ADD CONSTRAINT \`FK_ddd27b9d02ef2643a764f7aa76d\` FOREIGN KEY (\`business_profile_id\`) REFERENCES \`business_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` ADD CONSTRAINT \`FK_cad3783b53b21a46d0e6c066cb2\` FOREIGN KEY (\`user_account_id\`) REFERENCES \`user_account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` ADD CONSTRAINT \`FK_75303bc7302fdd9a948d44bce14\` FOREIGN KEY (\`business_branch_id\`) REFERENCES \`business_branch\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` DROP FOREIGN KEY \`FK_75303bc7302fdd9a948d44bce14\``);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` DROP FOREIGN KEY \`FK_cad3783b53b21a46d0e6c066cb2\``);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` DROP FOREIGN KEY \`FK_ddd27b9d02ef2643a764f7aa76d\``);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` DROP FOREIGN KEY \`FK_7c2a8f0c5e752a74f4657f77a79\``);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` CHANGE \`business_branch_id\` \`business_branch_id\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` CHANGE \`user_account_id\` \`user_account_id\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` ADD CONSTRAINT \`FK_75303bc7302fdd9a948d44bce14\` FOREIGN KEY (\`business_branch_id\`) REFERENCES \`business_branch\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` ADD CONSTRAINT \`FK_cad3783b53b21a46d0e6c066cb2\` FOREIGN KEY (\`user_account_id\`) REFERENCES \`user_account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` CHANGE \`business_profile_id\` \`business_profile_id\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` CHANGE \`user_account_id\` \`user_account_id\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` ADD \`id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` ADD CONSTRAINT \`FK_ddd27b9d02ef2643a764f7aa76d\` FOREIGN KEY (\`business_profile_id\`) REFERENCES \`business_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` ADD CONSTRAINT \`FK_7c2a8f0c5e752a74f4657f77a79\` FOREIGN KEY (\`user_account_id\`) REFERENCES \`user_account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` ADD \`businessBranchId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` CHANGE \`id\` \`id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` ADD PRIMARY KEY (\`id\`, \`businessBranchId\`)`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` CHANGE \`id\` \`id\` bigint NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` ADD \`userAccountId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` CHANGE \`id\` \`id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` ADD PRIMARY KEY (\`id\`, \`userAccountId\`, \`businessBranchId\`)`);
        await queryRunner.query(`ALTER TABLE \`user_business_branch\` CHANGE \`id\` \`id\` bigint NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` ADD \`businessProfileId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_business_profile\` ADD PRIMARY KEY (\`id\`, \`businessProfileId\`)`);
    }

}
