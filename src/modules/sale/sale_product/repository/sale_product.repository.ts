import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { SaleProductEntity } from "../entities/sale_product.entity";

@Injectable()
export class SaleProductRepository extends Repository<SaleProductEntity>{
    constructor(private dataSource: DataSource) {
        super(SaleProductEntity, dataSource.createEntityManager());
      }
}