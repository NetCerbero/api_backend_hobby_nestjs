import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { BusinessBranchEntity } from "../entities/business_branch.entity";

export interface ParamsBusinessBranch{
  branch:number;
  business?:number;
}

@Injectable()
export class BusinessBranchRepository extends Repository<BusinessBranchEntity>{
    constructor(private dataSource: DataSource) {
        super(BusinessBranchEntity, dataSource.createEntityManager());
      }

    async getListByBusiness(business?:number){
      const query = this.createQueryBuilder("b")
      .select()
      .innerJoinAndSelect("b.business","bb")
      .innerJoinAndSelect("b.location","bl")

      if(business){
        query.where("b.businessId = :business",{business})
      }

      return await query.orderBy("b.createdAt","DESC").getMany();
    }

    async getByIdAndBusiness(params:ParamsBusinessBranch){
      const query = this.createQueryBuilder("b")
      .select()
      .innerJoinAndSelect("b.business","bb")
      .innerJoinAndSelect("b.location","bl")
      .where("b.id = :branch",{branch:params.branch})
      if(params.business){
        query.andWhere("b.businessId = :business",{business:params.business})
      }

      return await query.getOne();
    }

    async updateByIdAndBusiness(params:ParamsBusinessBranch&{data:Partial<BusinessBranchEntity>}){
      const query  = this.createQueryBuilder()
      .update(BusinessBranchEntity)
      .set(params.data)
      .where("id = :branch",{branch:params.branch})

      if(params.business){
        query.andWhere("businessId = :business",{business:params.business})
      }

      await query.execute();
    }

    async removeByIdAndBusiness(params:ParamsBusinessBranch){
      const query = this.createQueryBuilder().softDelete().where("id = :branch",{branch:params.branch});

      if(params.business){
        query.andWhere("businessId = :business",{business:params.business})
      }

      await query.execute();
    }
}