import { Inject, Injectable } from '@nestjs/common';
import { IUserAuthSession } from 'src/modules/user/user_auth/interface/user_auth_session.interface';
import { CreateBusinessBranchDto } from './dto/create-business_branch.dto';
import { UpdateBusinessBranchDto } from './dto/update-business_branch.dto';
import { BusinessBranchRepository } from './repository/business_branch.repository';

@Injectable()
export class BusinessBranchService {
  constructor(
    @Inject(BusinessBranchRepository)
    private readonly businessBranch: BusinessBranchRepository
  ) { }

  async create(createBusinessBranchDto: CreateBusinessBranchDto) {
    console.log("createBusinessBranchDto",createBusinessBranchDto)
    await this.businessBranch.save(createBusinessBranchDto)
  }

  async findAll(auth?: IUserAuthSession) {
    return await this.businessBranch.getListByBusiness(auth?.tenantId);
  }

  async findOne(id: number, auth?: IUserAuthSession) {
    return await this.businessBranch.getByIdAndBusiness({ branch: id, business: auth.tenantId });
  }

  async update(id: number, updateBusinessBranchDto: UpdateBusinessBranchDto, auth?: IUserAuthSession) {
    await this.businessBranch.updateByIdAndBusiness({ branch: id, business: auth?.tenantId, data: updateBusinessBranchDto });
  }

  async remove(id: number,auth?: IUserAuthSession) {
    await this.businessBranch.removeByIdAndBusiness({branch:id,business:auth.tenantId});
  }
}
