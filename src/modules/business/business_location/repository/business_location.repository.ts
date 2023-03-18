import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { BusinessLocationEntity } from "../entities/business_location.entity";

@Injectable()
export class BusinessLocationRepository extends Repository<BusinessLocationEntity>{
  constructor(private dataSource: DataSource) {
    super(BusinessLocationEntity, dataSource.createEntityManager());
  }

  async getSelected() {
    return await this.createQueryBuilder("bl").where("bl.default = true").getOne();
  }

  async getById(id: number) {
    return await this.createQueryBuilder().where("id = :id", { id }).getOne();
  }
}