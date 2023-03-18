import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserAccountEntity } from "../entities/user_account.entity";

@Injectable()
export class UserAccountRepository extends Repository<UserAccountEntity> {
    constructor(private dataSource: DataSource) {
        super(UserAccountEntity, dataSource.createEntityManager());
    }
    async getById(id: number): Promise<UserAccountEntity> {
        return await this.createQueryBuilder().where("id = :id", { id }).getOne();
    }

    async getByEmail(email: string) {
        return await this.createQueryBuilder().select().where("email = :email", { email }).getOne();
    }

    async getByEmailWithAllRel(email: string) {
        return await this.createQueryBuilder("uc")
            .select()
            .addSelect("uc.password")
            .leftJoinAndSelect("uc.business", "ucb")
            .leftJoinAndSelect("uc.branches", "ucbb")
            .leftJoinAndSelect("ucb.businessProfile", "ucbp")
            .leftJoinAndSelect("ucbb.businessBranch", "ucbbb")
            .leftJoinAndSelect("ucbbb.location", "l")
            .where("uc.email = :email", { email })
            .getOne();
    }

    async getByIdWithAllRel(id: string|number) {
        return await this.createQueryBuilder("uc")
            .select()
            .addSelect("uc.password")
            .leftJoinAndSelect("uc.business", "ucb")
            .leftJoinAndSelect("uc.branches", "ucbb")
            .leftJoinAndSelect("ucb.businessProfile", "ucbp")
            .leftJoinAndSelect("ucbb.businessBranch", "ucbbb")
            .leftJoinAndSelect("ucbbb.location", "l")
            .where("uc.id = :id", { id })
            .getOne();
    }

    async getLisWithBranchAndBusiness() {
        const query = this.createQueryBuilder("uc")
            .select()
            .leftJoinAndSelect("uc.business", "ucb")
            .leftJoinAndSelect("uc.branches", "ucbb")
            .leftJoinAndSelect("ucb.businessProfile", "ucbp")
            .leftJoinAndSelect("ucbb.businessBranch", "ucbbb")
            .leftJoinAndSelect("ucbbb.location", "l")
            .orderBy("uc.createdAt", "DESC")

        return await query.getMany()


    }
}