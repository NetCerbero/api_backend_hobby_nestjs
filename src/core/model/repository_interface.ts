import { BaseEntity, EntitySchema } from "typeorm";


export class RepositoryBasicInterface {
    constructor() {
        if (this.constructor == RepositoryBasicInterface) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    async getById():Promise<BaseEntity|null>{
        throw new Error("Method must be implemented.");
    }

    async getList():Promise<BaseEntity[]|null>{
        throw new Error("Method must be implemented.");
    }
}