import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SaleCategoryService } from './sale_category.service';
import { CreateSaleCategoryDto } from './dto/create-sale_category.dto';
import { UpdateSaleCategoryDto } from './dto/update-sale_category.dto';
import { JwtAuthGuard } from 'src/core/guard/jwtGuard';

@UseGuards(JwtAuthGuard)
@Controller('v1/sale-category')
export class SaleCategoryController {
  constructor(private readonly saleCategoryService: SaleCategoryService) {}

  @Post()
  create(@Body() createSaleCategoryDto: CreateSaleCategoryDto) {
    return this.saleCategoryService.create(createSaleCategoryDto);
  }

  @Get()
  findAll() {
    return this.saleCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleCategoryDto: UpdateSaleCategoryDto) {
    return this.saleCategoryService.update(+id, updateSaleCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleCategoryService.remove(+id);
  }
}
