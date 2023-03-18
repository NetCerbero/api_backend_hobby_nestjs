import { Test, TestingModule } from '@nestjs/testing';
import { BusinessProfileController } from './business_profile.controller';
import { BusinessProfileService } from './business_profile.service';

describe('BusinessProfileController', () => {
  let controller: BusinessProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessProfileController],
      providers: [BusinessProfileService],
    }).compile();

    controller = module.get<BusinessProfileController>(BusinessProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
