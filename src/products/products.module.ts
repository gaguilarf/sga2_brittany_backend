import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsTypeOrmEntity } from './infrastructure/persistence/typeorm/products.typeorm-entity';
import { ProductsService } from './application/services/products.service';
import { ProductsController } from './presentation/controllers/products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsTypeOrmEntity])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
