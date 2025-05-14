import * as bcrypt from 'bcrypt';
interface SeedCar {
  model: string;
  year: number;
  description: string;
  stock: number;
  price: number;
  isAvailable: boolean;
  brand_id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

interface SeedBrand {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

interface SeedUser {
  email: string;
  fullName: string;
  password: string;
  roles: string[];
}

interface SeedData {
  users: SeedUser[];
  cars: SeedCar[];
  brands: SeedBrand[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'test1@google.com',
      fullName: 'Test One',
      password: bcrypt.hashSync('Abc123', 10),
      roles: ['admin'],
    },
    {
      email: 'test2@google.com',
      fullName: 'Test Two',
      password: bcrypt.hashSync('Abc123', 10),
      roles: ['user', 'super-user'],
    },
    {
      email: 'gabrielgriffin@gmail.com',
      fullName: 'Gabriel Griffin',
      password: bcrypt.hashSync('Abc123', 10),
      roles: ['admin', 'super-user'],
    },
  ],

  cars: [
    {
      model: 'Model S Plaid',
      year: 2024,
      stock: 3,
      price: 89990,
      isAvailable: true,
      brand_id: 1,
      description: 'The Tesla Model S Plaid is the ultimate performance sedan.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      model: 'Cybertruck Dual Motor AWD',
      year: 2024,
      stock: 0,
      price: 59990,
      isAvailable: false,
      brand_id: 1,
      description: 'Engineered for utility and built for adventure.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      model: 'Mustang Mach-E Premium',
      year: 2023,
      stock: 12,
      price: 48995,
      isAvailable: true,
      brand_id: 2,
      description:
        'The Ford Mustang Mach-E Premium is a fully electric SUV blending iconic.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      model: 'ID.4 Pro S',
      year: 2024,
      stock: 6,
      price: 43570,
      isAvailable: true,
      brand_id: 3,
      description: 'Volkswagen’s ID.4 Pro S is a sleek.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      model: 'Rivian R1T Adventure',
      year: 2024,
      stock: 2,
      price: 73900,
      isAvailable: true,
      brand_id: 4,
      description: 'Built for rugged terrain, the Rivian R1T Adventure.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  brands: [
    {
      name: 'Tesla',
      description: 'Vehículos eléctricos con diseño y tecnología avanzada.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Ford',
      description: 'Marca icónica con enfoque en innovación y electrificación.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Volkswagen',
      description: 'Ingeniería alemana con visión sostenible y moderna.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Rivian',
      description: 'SUVs y camionetas eléctricas pensadas para la aventura.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};
