import { Injectable } from '@nestjs/common';
import { RepositoryTransactionInterface } from 'src/database/interface/repository_transaction.interface';
import { DataSource, DeepPartial, EntityManager, In, Repository } from 'typeorm';
import { SaleProductEntity } from '../entities/sale_product.entity';

@Injectable()
export class SaleProductRepository extends Repository<SaleProductEntity>   implements RepositoryTransactionInterface<SaleProductEntity> {
  constructor(private dataSource: DataSource) {
    super(SaleProductEntity, dataSource.createEntityManager());
  }
  saveTransaction<T extends DeepPartial<SaleProductEntity>>(manager: EntityManager, entities: T[]): Promise<SaleProductEntity[]>;
  saveTransaction<T extends DeepPartial<SaleProductEntity>>(manager: EntityManager, entity: T): Promise<SaleProductEntity>;
  async saveTransaction(manager: EntityManager, entity: unknown):  Promise<SaleProductEntity | SaleProductEntity[]> {
    return await manager.save(SaleProductEntity, entity);
  }
  
  async updateTransaction<T extends DeepPartial<SaleProductEntity>>(manager: EntityManager, id: number, entity: T): Promise<void> {
    await manager.update(SaleProductEntity,id,entity);
  }

  async belongsToBusinessTransaction(manager:EntityManager,productIds:number[],business:number){
    const result = await manager.findBy(SaleProductEntity,{id:In(productIds),businessId:business})
    return result.length === productIds.length;
  }

  async belongsToBusiness(productIds:number[],business:number){
    const result = await this.findBy({id:In(productIds),businessId:business})
    return result.length === productIds.length;
  }

  async getBySkuBusinessTransaction(
    manager: EntityManager,
    sku: string,
    business: number,
  ) {
    return await manager
      .createQueryBuilder(SaleProductEntity, 's')
      .select()
      .where('s.sku = :sku', { sku })
      .andWhere('s.businessId = :business', { business })
      .getOne();
  }

  async getAllWithRelByBusiness(business: number) {
    return await this.createQueryBuilder('p')
      .select()
      .innerJoinAndSelect('p.category', 'c')
      .innerJoinAndSelect('p.avaibleInBranch', 'ab')
      .where('p.businessId = :business', { business })
      .orderBy('p.createdAt', 'DESC')
      .getMany();
  }

  async getOneWithRelByBusiness(id: number, business: number) {
    return await this.createQueryBuilder('p')
      .select()
      .innerJoinAndSelect('p.category', 'c')
      .innerJoinAndSelect('p.avaibleInBranch', 'ab')
      .where('p.businessId = :business', { business })
      .andWhere('p.id = :id', { id })
      .getOne();
  }
}
