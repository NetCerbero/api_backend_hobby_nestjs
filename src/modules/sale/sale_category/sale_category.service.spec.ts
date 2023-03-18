import { Test, TestingModule } from '@nestjs/testing';
import { SaleCategoryService } from './sale_category.service';

describe('SaleCategoryService', () => {
  let service: SaleCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaleCategoryService],
    }).compile();

    service = module.get<SaleCategoryService>(SaleCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
