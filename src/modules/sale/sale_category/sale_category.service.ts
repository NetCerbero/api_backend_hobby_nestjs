import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MessageException } from 'src/core/exception/messageException';
import { IUserAuthSession } from 'src/modules/user/user_auth/interface/user_auth_session.interface';
import { CreateSaleCategoryDto } from './dto/create-sale_category.dto';
import { UpdateSaleCategoryDto } from './dto/update-sale_category.dto';
import { SaleCategoryRepository } from './repository/sale_category.repository';

@Injectable()
export class SaleCategoryService {
  constructor(
    @Inject(SaleCategoryRepository)
    private readonly saleCategory: SaleCategoryRepository,
  ) {}

  async create(
    createSaleCategoryDto: CreateSaleCategoryDto,
    auth?: IUserAuthSession,
  ) {
    await this.saleCategory.save({
      ...createSaleCategoryDto,
      businessId: auth.tenantId,
    });
  }

  async findAll(auth: IUserAuthSession) {
    return await this.saleCategory.getListByBusiness(auth.tenantId);
  }

  async findOne(id: number, auth: IUserAuthSession) {
    const find = await this.saleCategory.getByIdAndBusiness(id, auth.tenantId);
    if (!find) throw new NotFoundException(MessageException.NOT_FOUND);
    return find;
  }

  async update(
    id: number,
    updateSaleCategoryDto: UpdateSaleCategoryDto,
    auth: IUserAuthSession,
  ) {
    const find = await this.saleCategory.getByIdAndBusiness(id, auth.tenantId);
    if (!find) throw new NotFoundException(MessageException.NOT_FOUND);
    await this.saleCategory.update(id, {
      ...updateSaleCategoryDto,
      businessId: auth.tenantId,
    });
  }

  async remove(id: number,auth:IUserAuthSession) {
    const find = await this.saleCategory.getByIdAndBusiness(id, auth.tenantId);
    if (!find) throw new NotFoundException(MessageException.NOT_FOUND);
    await this.saleCategory.softRemove(find);
  }
}
