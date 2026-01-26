import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlansTypeOrmEntity } from './infrastructure/persistence/typeorm/plans.typeorm-entity';
import { PriceSedePlanTypeOrmEntity } from './infrastructure/persistence/typeorm/price-sede-plan.typeorm-entity';
import { PlansService, PricesService } from './application/services';
import { PlansController } from './presentation/controllers/plans.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlansTypeOrmEntity, PriceSedePlanTypeOrmEntity]),
  ],
  controllers: [PlansController],
  providers: [PlansService, PricesService],
  exports: [PlansService, PricesService],
})
export class PlansModule {}
