import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusinessLocationService } from './business_location.service';
import { CreateBusinessLocationDto } from './dto/create-business_location.dto';
import { UpdateBusinessLocationDto } from './dto/update-business_location.dto';

@Controller('v1/business-location')
export class BusinessLocationController {
  constructor(private readonly businessLocationService: BusinessLocationService) {}

  @Post()
  create(@Body() createBusinessLocationDto: CreateBusinessLocationDto) {
    return this.businessLocationService.create(createBusinessLocationDto);
  }

  @Get()
  findAll() {
    return this.businessLocationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessLocationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusinessLocationDto: UpdateBusinessLocationDto) {
    return this.businessLocationService.update(+id, updateBusinessLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessLocationService.remove(+id);
  }
}
