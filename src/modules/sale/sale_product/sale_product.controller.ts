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
import { SaleProductService } from './sale_product.service';
import { CreateSaleProductDto } from './dto/create-sale_product.dto';
import { UpdateSaleProductDto } from './dto/update-sale_product.dto';
import { PermissionGuard } from 'src/core/guard/permissionGuard';
import { JwtAuthGuard } from 'src/core/guard/jwtGuard';
import { UserPayload } from 'src/core/decoration/userPayload.decorator';

@UseGuards(JwtAuthGuard, PermissionGuard)
@Controller('v1/sale-product')
export class SaleProductController {
  constructor(private readonly saleProductService: SaleProductService) {}

  @Post()
  create(
    @UserPayload() auth,
    @Body() createSaleProductDto: CreateSaleProductDto,
  ) {
    return this.saleProductService.create(createSaleProductDto, auth);
  }

  @Get()
  findAll(@UserPayload() auth) {
    return this.saleProductService.findAll(auth);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @UserPayload() auth) {
    return this.saleProductService.findOne(+id, auth);
  }

  @Patch(':id')
  update(
    @UserPayload() auth,
    @Param('id') id: string,
    @Body() updateSaleProductDto: UpdateSaleProductDto,
  ) {
    return this.saleProductService.update(+id, updateSaleProductDto, auth);
  }

  @Delete(':id')
  remove(@UserPayload() auth, @Param('id') id: string) {
    return this.saleProductService.remove(+id, auth);
  }
}
