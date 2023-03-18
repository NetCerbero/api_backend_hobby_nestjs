import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserBusinessProfileEntity } from "../entities/user_account.entity";

@Injectable()
export class UserBusinessProfileRepository extends Repository<UserBusinessProfileEntity>{
    constructor(private dataSource: DataSource) {
        super(UserBusinessProfileEntity, dataSource.createEntityManager());
      }
}