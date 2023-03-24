import { Module } from '@nestjs/common';
import { SaleProductService } from './sale_product.service';
import { SaleProductController } from './sale_product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleProductEntity } from './entities/sale_product.entity';
import { SaleProductRepository } from './repository/sale_product.repository';
import { SaleProductBranchEntity } from './entities/sale_product_branch.entity';
import { SaleProductBranchRepository } from './repository/sale_product_branch.repository';
import { BusinessBranchEntity } from 'src/modules/business/business_branch/entities/business_branch.entity';
import { BusinessBranchRepository } from 'src/modules/business/business_branch/repository/business_branch.repository';
import { SaleCategoryEntity } from '../sale_category/entities/sale_category.entity';
import { SaleCategoryRepository } from '../sale_category/repository/sale_category.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SaleProductEntity,
      SaleProductBranchEntity,
      BusinessBranchEntity,
      SaleCategoryEntity
    ]),
  ],
  controllers: [SaleProductController],
  providers: [
    BusinessBranchRepository,
    SaleProductBranchRepository,
    SaleProductRepository,
    SaleCategoryRepository,
    SaleProductService,
  ],
})
export class SaleProductModule {}
