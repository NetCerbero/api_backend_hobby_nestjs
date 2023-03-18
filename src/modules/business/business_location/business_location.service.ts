import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MessageException } from 'src/core/exception/messageException';
import { CreateBusinessLocationDto } from './dto/create-business_location.dto';
import { UpdateBusinessLocationDto } from './dto/update-business_location.dto';
import { BusinessLocationRepository } from './repository/business_location.repository';

@Injectable()
export class BusinessLocationService {
  constructor(
    @Inject(BusinessLocationRepository)
    private readonly businessLocation: BusinessLocationRepository
  ) { }
  async create(createBusinessLocationDto: CreateBusinessLocationDto) {
    if (createBusinessLocationDto.default) {
      const findLast = await this.businessLocation.getSelected();
      if (findLast) await this.businessLocation.update(findLast.id, { default: false });
    }

    await this.businessLocation.save(createBusinessLocationDto);
  }

  async findAll() {
    return await this.businessLocation.find({order:{createdAt:"DESC"}});
  }

  async findOne(id: number) {
    const location = await this.businessLocation.getById(id);
    if (!location) throw new NotFoundException(MessageException.NOT_FOUND);
    return location;
  }

  async update(id: number, updateBusinessLocationDto: UpdateBusinessLocationDto) {
    await this.businessLocation.update(id,updateBusinessLocationDto)
  }

  async remove(id: number) {
    return await this.businessLocation.softDelete(id)
  }
}
