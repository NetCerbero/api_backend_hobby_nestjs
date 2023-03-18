import { Test, TestingModule } from '@nestjs/testing';
import { SaleCategoryController } from './sale_category.controller';
import { SaleCategoryService } from './sale_category.service';

describe('SaleCategoryController', () => {
  let controller: SaleCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleCategoryController],
      providers: [SaleCategoryService],
    }).compile();

    controller = module.get<SaleCategoryController>(SaleCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
