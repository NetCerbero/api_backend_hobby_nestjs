import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateBusinessProfileDto } from './dto/create-business_profile.dto';
import { UpdateBusinessProfileDto } from './dto/update-business_profile.dto';
import { BusinessProfileRepository } from './repository/business_profile.repository';

@Injectable()
export class BusinessProfileService {
  constructor(
    @Inject(BusinessProfileRepository)
    private readonly businessProfile:BusinessProfileRepository
  ){}

  async create(createBusinessProfileDto: CreateBusinessProfileDto) {
    const findSimilar = await this.businessProfile.getAnyByTenantKey(createBusinessProfileDto.tenantKey);
    if(findSimilar) throw new ConflictException("Ingrese otra idenitificacion del perfil");
    
    return await this.businessProfile.save(createBusinessProfileDto);
  }

  async findAll() {
    return await this.businessProfile.getListWithBranches();
  }

  async findOne(id: number) {
    return await this.businessProfile.getByIdWithBranches(id);
  }

  async update(id: number, {tenantKey,...rst}: UpdateBusinessProfileDto) {
    return await this.businessProfile.update(id,rst);
  }

  async remove(id: number) {
    return await this.businessProfile.softDelete(id);
  }
}
