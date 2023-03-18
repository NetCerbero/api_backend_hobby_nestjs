import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SaleCategoryService } from './sale_category.service';
import { CreateSaleCategoryDto } from './dto/create-sale_category.dto';
import { UpdateSaleCategoryDto } from './dto/update-sale_category.dto';
import { JwtAuthGuard } from 'src/core/guard/jwtGuard';
import { UserPayload } from 'src/core/decoration/userPayload.decorator';
import { PermissionGuard } from 'src/core/guard/permissionGuard';
import { Permission } from 'src/core/decoration/permission';

@UseGuards(JwtAuthGuard,PermissionGuard)
@Controller('v1/sale-category')
export class SaleCategoryController {
  constructor(private readonly saleCategoryService: SaleCategoryService) {}

  @Post()
  @Permission("category_create","comida")
  create(
    @UserPayload() userAuth,
    @Body() createSaleCategoryDto: CreateSaleCategoryDto,
  ) {
    return this.saleCategoryService.create(createSaleCategoryDto, userAuth);
  }

  @Get()
  @Permission("category_list","hambre")
  findAll(@UserPayload() userAuth) {
    return this.saleCategoryService.findAll(userAuth);
  }

  @Get(':id')
  findOne(@UserPayload() userAuth, @Param('id') id: string) {
    return this.saleCategoryService.findOne(+id, userAuth);
  }

  @Patch(':id')
  update(
    @UserPayload() userAuth,
    @Param('id') id: string,
    @Body() updateSaleCategoryDto: UpdateSaleCategoryDto,
  ) {
    return this.saleCategoryService.update(
      +id,
      updateSaleCategoryDto,
      userAuth,
    );
  }

  @Delete(':id')
  remove(@UserPayload() userAuth, @Param('id') id: string) {
    return this.saleCategoryService.remove(+id, userAuth);
  }
}
