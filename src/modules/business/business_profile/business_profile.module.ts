import { Module } from '@nestjs/common';
import { BusinessProfileService } from './business_profile.service';
import { BusinessProfileController } from './business_profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessProfileRepository } from './repository/business_profile.repository';

@Module({
  imports:[TypeOrmModule.forFeature([BusinessProfileRepository])],
  controllers: [BusinessProfileController],
  providers: [BusinessProfileRepository,BusinessProfileService]
})
export class BusinessProfileModule {}
