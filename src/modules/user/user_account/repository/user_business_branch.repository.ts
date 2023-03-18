import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserBusinessBranchEntity } from "../entities/user_account.entity";

@Injectable()
export class UserBusinessBranchRepository extends Repository<UserBusinessBranchEntity>{
    constructor(private dataSource: DataSource) {
        super(UserBusinessBranchEntity, dataSource.createEntityManager());
      }
}