import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarDto, FilterCarDto, UpdateCarDto } from '../dto/car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from '../entities/car.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { Brand } from '../../brands/entities/brand.entity';
import { User } from '../../../auth/entities/user.entity';

@Injectable()
export class CarsService {
  private readonly logger = new Logger('CarsService');

  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  // findAll(paginationDto: PaginationDto) {
  //   const { limit = 3, offset = 0 } = paginationDto;
  //   return this.carRepository.find({
  //     take: limit,
  //     skip: offset,
  //   });
  // }

  findAll(params?: FilterCarDto) {
    const { limit, offset, description } = params || {};
    const where: FindOptionsWhere<Car> = {};

    if (description) {
      where.description = ILike(`%${description}%`);
    }

    return this.carRepository.find({
      order: { id: 'ASC' },
      where,
      take: limit,
      skip: offset,
      relations: {
        brand: true,
      },
    });
  }

  async create(createCarDto: CreateCarDto, user: User) {
    try {
      const car = this.carRepository.create({ ...createCarDto, user });
      await this.carRepository.save(car);
      return car;
    } catch (error) {
      // console.log(error);
      // throw new InternalServerErrorException('Ayuda!');
      this.handleDBException(error);
    }
  }

  async findOne(id: number) {
    const car = await this.carRepository.findOne({
      where: { id: id },
      relations: { brand: true },
    });

    if (!car) {
      throw new NotFoundException(
        `Carro con id ${id} no encontrado en la base de datos`,
      );
    }
    return car;
  }

  async update(id: number, changes: UpdateCarDto, user: User) {
    const car = await this.carRepository.findOne({
      where: { id },
      relations: { brand: true, user: true },
    });

    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }

    if (changes.brand_id) {
      const brand = await this.brandRepository.findOneBy({
        id: changes.brand_id,
      });
      if (!brand) {
        throw new NotFoundException(
          `Brand with id ${changes.brand_id} not found`,
        );
      }
      car.brand = brand;
    }

    if (user) {
      car.user = user;
    }

    this.carRepository.merge(car, changes);

    const updated = await this.carRepository.save(car);

    return {
      message: 'Registro actualizado correctamente',
      data: updated,
    };
  }

  // async remove(id: number) {
  //   const car = await this.findOne(id);
  //   await this.carRepository.remove(car);
  // }

  async remove(id: number) {
    const exists = await this.carRepository.existsBy({ id });
    if (!exists) {
      throw new NotFoundException(`Carro con id ${id} no encontrado`);
    }
    await this.carRepository.softDelete(id);
    return {
      message: `Auto con ID ${id} eliminado con éxito`,
      deletedAt: new Date(),
    };
  }

  async deleteAllCars() {
    const query = this.carRepository.createQueryBuilder('car');

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
