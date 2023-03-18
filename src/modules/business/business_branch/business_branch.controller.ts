import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusinessBranchService } from './business_branch.service';
import { CreateBusinessBranchDto } from './dto/create-business_branch.dto';
import { UpdateBusinessBranchDto } from './dto/update-business_branch.dto';

@Controller('v1/business-branch')
export class BusinessBranchController {
  constructor(private readonly businessBranchService: BusinessBranchService) {}

  @Post()
  create(@Body() createBusinessBranchDto: CreateBusinessBranchDto) {
    return this.businessBranchService.create(createBusinessBranchDto);
  }

  @Get()
  findAll() {
    return this.businessBranchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessBranchService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusinessBranchDto: UpdateBusinessBranchDto) {
    return this.businessBranchService.update(+id, updateBusinessBranchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessBranchService.remove(+id);
  }
}
