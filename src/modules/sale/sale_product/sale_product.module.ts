import { Module } from '@nestjs/common';
import { SaleProductService } from './sale_product.service';
import { SaleProductController } from './sale_product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleProductEntity } from './entities/sale_product.entity';
import { SaleProductRepository } from './repository/sale_product.repository';

@Module({
  imports:[TypeOrmModule.forFeature([SaleProductEntity])],
  controllers: [SaleProductController],
  providers: [SaleProductRepository,SaleProductService]
})
export class SaleProductModule {}
