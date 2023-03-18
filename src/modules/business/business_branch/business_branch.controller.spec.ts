import { Test, TestingModule } from '@nestjs/testing';
import { BusinessBranchController } from './business_branch.controller';
import { BusinessBranchService } from './business_branch.service';

describe('BusinessBranchController', () => {
  let controller: BusinessBranchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessBranchController],
      providers: [BusinessBranchService],
    }).compile();

    controller = module.get<BusinessBranchController>(BusinessBranchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
