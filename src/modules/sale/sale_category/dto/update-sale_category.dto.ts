import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleCategoryDto } from './create-sale_category.dto';

export class UpdateSaleCategoryDto extends PartialType(CreateSaleCategoryDto) {}
