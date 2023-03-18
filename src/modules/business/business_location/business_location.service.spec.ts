import { Test, TestingModule } from '@nestjs/testing';
import { BusinessLocationService } from './business_location.service';

describe('BusinessLocationService', () => {
  let service: BusinessLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessLocationService],
    }).compile();

    service = module.get<BusinessLocationService>(BusinessLocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
