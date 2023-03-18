import { Module } from '@nestjs/common';
import { BusinessLocationService } from './business_location.service';
import { BusinessLocationController } from './business_location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessLocationRepository } from './repository/business_location.repository';
import { BusinessLocationEntity } from './entities/business_location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessLocationEntity])],
  controllers: [BusinessLocationController],
  providers: [BusinessLocationRepository,BusinessLocationService]
})
export class BusinessLocationModule {}
