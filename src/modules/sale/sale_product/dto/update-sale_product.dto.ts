import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleProductDto } from './create-sale_product.dto';

export class UpdateSaleProductDto extends PartialType(CreateSaleProductDto) {}
