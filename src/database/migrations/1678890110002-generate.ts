import { MigrationInterface, QueryRunner } from "typeorm";

export class generate1678890110002 implements MigrationInterface {
    name = 'generate1678890110002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`business_profile\` CHANGE \`tradeName\` \`trade_name\` varchar(150) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`business_profile\` CHANGE \`trade_name\` \`tradeName\` varchar(150) NOT NULL`);
    }

}
