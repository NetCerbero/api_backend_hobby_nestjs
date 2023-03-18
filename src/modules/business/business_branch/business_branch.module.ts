import { Module } from '@nestjs/common';
import { BusinessBranchService } from './business_branch.service';
import { BusinessBranchController } from './business_branch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessBranchEntity } from './entities/business_branch.entity';
import { BusinessBranchRepository } from './repository/business_branch.repository';

@Module({
  imports:[TypeOrmModule.forFeature([BusinessBranchEntity])],
  controllers: [BusinessBranchController],
  providers: [BusinessBranchRepository,BusinessBranchService]
})
export class BusinessBranchModule {}
