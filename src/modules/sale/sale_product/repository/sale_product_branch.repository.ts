import { Injectable } from '@nestjs/common';
import { RepositoryTransactionInterface } from 'src/database/interface/repository_transaction.interface';
import {
  DataSource,
  DeepPartial,
  EntityManager,
  In,
  Repository,
} from 'typeorm';
import { SaleProductBranchEntity } from '../entities/sale_product_branch.entity';

@Injectable()
export class SaleProductBranchRepository
  extends Repository<SaleProductBranchEntity>
  implements RepositoryTransactionInterface<SaleProductBranchEntity>
{
  constructor(private dataSource: DataSource) {
    super(SaleProductBranchEntity, dataSource.createEntityManager());
  }

  async updateTransaction<T extends DeepPartial<SaleProductBranchEntity>>(
    manager: EntityManager,
    id: number,
    entity: T,
  ): Promise<void> {
    await manager.update(SaleProductBranchEntity, id, entity);
  }

  async getOneByBranchAndProductTransaction(
    manager: EntityManager,
    branch: number,
    product: number,
  ) {
    return await manager
      .createQueryBuilder(SaleProductBranchEntity, 'pb')
      .select()
      .where('pb.branchId = :branch and pb.productId = :product', {
        branch,
        product,
      }).getOne();
  }

  saveTransaction<T extends DeepPartial<SaleProductBranchEntity>>(
    manager: EntityManager,
    entities: T[],
  ): Promise<T[]>;
  saveTransaction<T extends DeepPartial<SaleProductBranchEntity>>(
    manager: EntityManager,
    entity: T,
  ): Promise<T>;
  async saveTransaction(
    manager: EntityManager,
    entity: unknown,
  ): Promise<SaleProductBranchEntity | SaleProductBranchEntity[]> {
    return await manager.save(SaleProductBranchEntity, entity);
  }
}
