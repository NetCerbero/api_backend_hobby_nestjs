import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessLocationDto } from './create-business_location.dto';

export class UpdateBusinessLocationDto extends PartialType(CreateBusinessLocationDto) {}
