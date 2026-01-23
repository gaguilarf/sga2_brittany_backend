import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsTypeOrmEntity } from '../../infrastructure/persistence/typeorm/products.typeorm-entity';
import { ProductResponseDto } from '../../domain/dtos/product-response.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(ProductsTypeOrmEntity)
    private readonly productsRepository: Repository<ProductsTypeOrmEntity>,
  ) {}

  async findAll(): Promise<ProductResponseDto[]> {
    try {
      this.logger.log('Fetching all products');
      const products = await this.productsRepository.find({
        order: { name: 'ASC' },
      });
      return products.map((p) => this.toResponseDto(p));
    } catch (error) {
      this.logger.error(
        `Error fetching products: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findActive(): Promise<ProductResponseDto[]> {
    try {
      this.logger.log('Fetching active products');
      const products = await this.productsRepository.find({
        where: { active: true },
        order: { name: 'ASC' },
      });
      return products.map((p) => this.toResponseDto(p));
    } catch (error) {
      this.logger.error(
        `Error fetching active products: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  private toResponseDto(entity: ProductsTypeOrmEntity): ProductResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      requiresSchedule: entity.requiresSchedule,
      requiresExamDate: entity.requiresExamDate,
      active: entity.active,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
