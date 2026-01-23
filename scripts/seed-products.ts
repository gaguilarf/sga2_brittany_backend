import { DataSource } from 'typeorm';
import { ProductsTypeOrmEntity } from '../src/products/infrastructure/persistence/typeorm/products.typeorm-entity';
import * as dotenv from 'dotenv';

dotenv.config();

async function seed() {
  const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'sga_db',
    entities: [__dirname + '/../src/**/*.typeorm-entity{.ts,.js}'],
    synchronize: false,
  });

  try {
    await AppDataSource.initialize();
    console.log('Data Source initialized');

    const productRepo = AppDataSource.getRepository(ProductsTypeOrmEntity);

    // Productos con sus configuraciones específicas
    const products = [
      {
        name: 'Examen Internacional British Council',
        requiresSchedule: false,
        requiresExamDate: true,
      },
      {
        name: 'Preparación para exámenes internacionales',
        requiresSchedule: true,
        requiresExamDate: false,
      },
      {
        name: 'Clases particulares',
        requiresSchedule: true,
        requiresExamDate: false,
      },
      {
        name: 'Curso de inglés a distancia (Edusoft)',
        requiresSchedule: true,
        requiresExamDate: false,
      },
      {
        name: 'Curso TEFL',
        requiresSchedule: true,
        requiresExamDate: false,
      },
      {
        name: 'Clubes de conversación',
        requiresSchedule: true,
        requiresExamDate: false,
      },
      {
        name: 'Programa Au Pair',
        requiresSchedule: true,
        requiresExamDate: false,
      },
      {
        name: 'Programa Viajes 360',
        requiresSchedule: true,
        requiresExamDate: false,
      },
      {
        name: 'Spanish Lessons',
        requiresSchedule: true,
        requiresExamDate: false,
      },
    ];

    for (const productData of products) {
      const exists = await productRepo.findOne({
        where: { name: productData.name },
      });
      if (!exists) {
        await productRepo.save({
          ...productData,
          active: true,
        });
        console.log(`Producto "${productData.name}" creado`);
      } else {
        console.log(`Producto "${productData.name}" ya existe`);
      }
    }

    console.log('Seed de productos completado exitosamente');
  } catch (error) {
    console.error('Error durante el seed:', error);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

seed();
