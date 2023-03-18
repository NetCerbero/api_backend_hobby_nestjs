import { Inject, Injectable } from '@nestjs/common';
import { IUserAuthSession } from 'src/modules/user/user_auth/interface/user_auth_session.interface';
import { CreateSaleCategoryDto } from './dto/create-sale_category.dto';
import { UpdateSaleCategoryDto } from './dto/update-sale_category.dto';
import { SaleCategoryRepository } from './repository/sale_category.repository';

@Injectable()
export class SaleCategoryService {
  constructor(
    @Inject(SaleCategoryRepository)
    private readonly saleCategory: SaleCategoryRepository
  ) {

  }

  async create(createSaleCategoryDto: CreateSaleCategoryDto, auth?: IUserAuthSession) {
    return await this.saleCategory.save({ ...createSaleCategoryDto, businessId: auth.tenantId });
  }

  async findAll(auth?: IUserAuthSession) {
    return await this.saleCategory.getListByBusiness(auth.tenantId);
  }

  findOne(id: number) {
    return `This action returns a #${id} saleCategory`;
  }

  update(id: number, updateSaleCategoryDto: UpdateSaleCategoryDto) {
    return `This action updates a #${id} saleCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} saleCategory`;
  }
}
