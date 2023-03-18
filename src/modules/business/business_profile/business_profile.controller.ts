import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusinessProfileService } from './business_profile.service';
import { CreateBusinessProfileDto } from './dto/create-business_profile.dto';
import { UpdateBusinessProfileDto } from './dto/update-business_profile.dto';

@Controller('v1/business-profile')
export class BusinessProfileController {
  constructor(private readonly businessProfileService: BusinessProfileService) {}

  @Post()
  create(@Body() createBusinessProfileDto: CreateBusinessProfileDto) {
    return this.businessProfileService.create(createBusinessProfileDto);
  }

  @Get()
  findAll() {
    return this.businessProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessProfileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusinessProfileDto: UpdateBusinessProfileDto) {
    return this.businessProfileService.update(+id, updateBusinessProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessProfileService.remove(+id);
  }
}
