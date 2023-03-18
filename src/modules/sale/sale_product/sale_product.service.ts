import { Injectable } from '@nestjs/common';
import { CreateSaleProductDto } from './dto/create-sale_product.dto';
import { UpdateSaleProductDto } from './dto/update-sale_product.dto';

@Injectable()
export class SaleProductService {
  create(createSaleProductDto: CreateSaleProductDto) {
    return 'This action adds a new saleProduct';
  }

  findAll() {
    return `This action returns all saleProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saleProduct`;
  }

  update(id: number, updateSaleProductDto: UpdateSaleProductDto) {
    return `This action updates a #${id} saleProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} saleProduct`;
  }
}
