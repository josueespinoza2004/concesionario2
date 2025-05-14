import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from '../entities/brand.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { CreateBrandDto, UpdateBrandDto } from '../dto/brand.dto';

@Injectable()
export class BrandsService {
  private readonly logger = new Logger('BrandsService');

  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  findAll(paginationDto: PaginationDto) {
    const { limit = 3, offset = 0 } = paginationDto;
    return this.brandRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async create(createBrandDto: CreateBrandDto) {
    try {
      const brand = this.brandRepository.create(createBrandDto);
      await this.brandRepository.save(brand);
      return brand;
    } catch (error) {
      // console.log(error);
      // throw new InternalServerErrorException('Ayuda!');
      this.handleDBException(error);
    }
  }

  async findOne(id: number) {
    const brand = await this.brandRepository.findOneBy({ id });
    if (!brand) {
      throw new NotFoundException(
        `Carro con id ${id} no encontrado en la base de datos`,
      );
    }
    return brand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const brand = await this.brandRepository.findOne({ where: { id } });

    if (!brand) {
      throw new NotFoundException(`Brand con id ${id} no encontrado`);
    }

    try {
      this.brandRepository.merge(brand, updateBrandDto);
      await this.brandRepository.save(brand);

      return {
        message: 'Registro actualizado  con éxito',
        data: brand,
      };
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async remove(id: number) {
    const exists = await this.brandRepository.existsBy({ id });
    if (!exists) {
      throw new NotFoundException(`Brand con id ${id} no encontrado`);
    }
    await this.brandRepository.softDelete(id);
    return {
      message: `Marca con ID ${id} eliminado con éxito`,
      deletedAt: new Date(),
    };
  }

  async deleteAllBrands() {
    const query = this.brandRepository.createQueryBuilder('brand');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBException(error);
    }
  }

  private handleDBException(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException(
      'Error inesperado, verifique los registros del servidor',
    );
  }
}
