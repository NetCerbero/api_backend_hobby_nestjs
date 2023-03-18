import { Test, TestingModule } from '@nestjs/testing';
import { BusinessLocationController } from './business_location.controller';
import { BusinessLocationService } from './business_location.service';

describe('BusinessLocationController', () => {
  let controller: BusinessLocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessLocationController],
      providers: [BusinessLocationService],
    }).compile();

    controller = module.get<BusinessLocationController>(BusinessLocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
