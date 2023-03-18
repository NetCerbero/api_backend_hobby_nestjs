import { Module } from '@nestjs/common';
import { UserAccountService } from './user_account.service';
import { UserAccountController } from './user_account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccountRepository } from './repository/user_acount.repository';
import { UserAccountEntity, UserBusinessBranchEntity, UserBusinessProfileEntity } from './entities/user_account.entity';
import { UserBusinessBranchRepository } from './repository/user_business_branch.repository';
import { UserBusinessProfileRepository } from './repository/user_business_profile_repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAccountEntity, UserBusinessBranchEntity, UserBusinessProfileEntity])
  ],
  controllers: [UserAccountController],
  providers: [UserBusinessBranchRepository, UserBusinessProfileRepository, UserAccountRepository, UserAccountService]
})
export class UserAccountModule { }
