import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessBranchDto } from './create-business_branch.dto';

export class UpdateBusinessBranchDto extends PartialType(CreateBusinessBranchDto) {}
