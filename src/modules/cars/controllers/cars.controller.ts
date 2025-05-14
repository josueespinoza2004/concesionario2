import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CarsService } from '../services/cars.service';
import { CreateCarDto, UpdateCarDto, FilterCarDto } from '../dto/car.dto';
import { Auth, GetUser } from '../../../auth/decorators';
import { ValidRoles } from '../../../auth/interfaces';
import { User } from '../../../auth/entities/user.entity';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  async getFindAll(@Query() params: FilterCarDto) {
    // console.log(paginationDto);
    const rows = await this.carsService.findAll(params);

    const data = {
      data: rows,
    };
    return data;
  }

  @Post()
  @Auth(ValidRoles.admin)
  async create(@Body() createCarDto: CreateCarDto, @GetUser() user: User) {
    const nuevo = await this.carsService.create(createCarDto, user);
    const data = {
      data: nuevo,
      message: 'Registro creado correctamente',
    };
    return data;
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    const rows = await this.carsService.findOne(id);
    const data = {
      data: rows,
    };
    return data;
  }

  @Put(':id')
  @Auth(ValidRoles.admin)
  async update(
    @Param('id') id: number,
    @Body() updateCarDto: UpdateCarDto,
    @GetUser() user: User,
  ) {
    const datos = await this.carsService.update(id, updateCarDto, user);
    const data = {
      data: datos,
      message: 'Registro actualizado correctamente',
    };
    return data;
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  async remove(@Param('id') id: number) {
    const dato = await this.carsService.remove(id);
    const data = {
      data: dato,
      message: 'Registro eliminado correctamente',
    };
    return data;
  }
}
