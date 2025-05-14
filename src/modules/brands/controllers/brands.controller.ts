import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BrandsService } from '../services/brands.service';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { CreateBrandDto, UpdateBrandDto } from '../dto/brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  getFindAll(@Query() paginationDto: PaginationDto) {
    // console.log(paginationDto);
    return this.brandsService.findAll(paginationDto);
  }

  @Post()
  createBrand(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.brandsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.brandsService.remove(id);
  }
}
