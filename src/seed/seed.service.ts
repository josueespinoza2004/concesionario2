import { Injectable } from '@nestjs/common';
import { CarsService } from '../modules/cars/services/cars.service';
import { initialData } from './data/seed-data';
import { Car } from '../modules/cars/entities/car.entity';
import { Brand } from '../modules/brands/entities/brand.entity';
import { BrandsService } from '../modules/brands/services/brands.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this.deleteTables();

    const adminUser = await this.insertUsers();

    await this.insertNewCars(adminUser);
    return 'SEED EXECUTED CARS';
  }
  async runSeedBrands() {
    await this.deleteTables();
    await this.insertNewBrands();
    return 'SEED EXECUTED BRANDS';
  }

  private async deleteTables() {
    await this.carsService.deleteAllCars();

    const queryBuilder = this.userRepository.createQueryBuilder();

    await queryBuilder.delete().where({}).execute();
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach((user) => {
      users.push(this.userRepository.create(user));
    });

    const dbUser = await this.userRepository.save(seedUsers);

    return dbUser[0];
  }

  private async insertNewCars(user: User) {
    await this.carsService.deleteAllCars();

    const cars = initialData.cars;
    const insertPromises: Promise<Car | undefined>[] = [];

    cars.forEach((car) => {
      insertPromises.push(this.carsService.create(car, user));
    });

    await Promise.all(insertPromises);

    return true;
  }

  private async insertNewBrands() {
    await this.brandsService.deleteAllBrands();

    const brands = initialData.brands;
    const insertPromises: Promise<Brand | undefined>[] = [];

    // brands.forEach((brand) => {
    //   insertPromises.push(this.brandsService.create(brand));
    // });

    await Promise.all(insertPromises);

    return true;
  }
}
