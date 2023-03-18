import { Module } from '@nestjs/common';
import { SaleCategoryService } from './sale_category.service';
import { SaleCategoryController } from './sale_category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleCategoryEntity } from './entities/sale_category.entity';
import { SaleCategoryRepository } from './repository/sale_category.repository';

@Module({
  imports:[TypeOrmModule.forFeature([SaleCategoryEntity])],
  controllers: [SaleCategoryController],
  providers: [SaleCategoryRepository,SaleCategoryService]
})
export class SaleCategoryModule {}
