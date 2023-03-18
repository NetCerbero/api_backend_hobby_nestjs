import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SaleCategoryEntity } from '../entities/sale_category.entity';

@Injectable()
export class SaleCategoryRepository extends Repository<SaleCategoryEntity> {
  constructor(private dataSource: DataSource) {
    super(SaleCategoryEntity, dataSource.createEntityManager());
  }

  async getListByBusiness(business?: number) {
    const query = this.createQueryBuilder('c').select();
    if (business) {
      query.where('c.businessId = :business', { business: business });
    }
    return await query.orderBy('c.createdAt', 'DESC').getMany();
  }

  async getByIdAndBusiness(id: number, business: number) {
    return await this.createQueryBuilder('c')
      .select()
      .where('c.id = :id and c.businessId = :business', { id, business })
      .getOne();
  }
}
