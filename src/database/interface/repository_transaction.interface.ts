import { DeepPartial, EntityManager, ObjectLiteral } from "typeorm";


export declare class RepositoryTransactionInterface <Entity extends ObjectLiteral> {
    saveTransaction<T extends DeepPartial<Entity>>(manager:EntityManager,entities: T[]): Promise<T[]>;
    saveTransaction<T extends DeepPartial<Entity>>(manager:EntityManager,entity: T): Promise<T>;
    updateTransaction<T extends DeepPartial<Entity>>(manager:EntityManager,id:number,entity: T): Promise<void>;
}