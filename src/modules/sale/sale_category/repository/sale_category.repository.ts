import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { SaleCategoryEntity } from "../entities/sale_category.entity";

@Injectable()
export class SaleCategoryRepository extends Repository<SaleCategoryEntity>{
    constructor(private dataSource: DataSource) {
        super(SaleCategoryEntity, dataSource.createEntityManager());
      }

    async getListByBusiness(business?:number){
      const query = this.createQueryBuilder().select();
      if(business){
        query.where("businessId = :business",{business});
      }

      return await query.orderBy("createdAt","DESC").getMany();
    }
}