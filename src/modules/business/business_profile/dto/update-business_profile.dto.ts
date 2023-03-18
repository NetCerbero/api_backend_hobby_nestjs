import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessProfileDto } from './create-business_profile.dto';

export class UpdateBusinessProfileDto extends PartialType(CreateBusinessProfileDto) {}
