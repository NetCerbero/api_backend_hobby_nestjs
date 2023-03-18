import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { BusinessProfileEntity } from "../entities/business_profile.entity";

@Injectable()
export class BusinessProfileRepository extends Repository<BusinessProfileEntity>{
    constructor(private dataSource: DataSource) {
        super(BusinessProfileEntity, dataSource.createEntityManager());
    }

    async getAnyByTenantKey(key: string) {
        return await this.createQueryBuilder("bp")
            .select().addSelect("bp.deletedAt")
            .where("bp.tenantKey = :key", { key })
            .withDeleted().getOne();
    }

    async getListWithBranches(){
        return await this.createQueryBuilder("bp")
        .select()
        .leftJoinAndSelect("bp.branches","bb")
        .leftJoinAndSelect("bb.location","bl")
        .orderBy("bp.createdAt","DESC")
        .getMany()
    }

    async getByIdWithBranches(id:number){
        return await this.createQueryBuilder("bp")
        .select()
        .leftJoinAndSelect("bp.branches","bb")
        .leftJoinAndSelect("bb.location","bl")
        .where("bp.id = :id",{id})
        .getOne()
    }
}