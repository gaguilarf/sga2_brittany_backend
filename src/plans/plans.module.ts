import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlansTypeOrmEntity } from './infrastructure/persistence/typeorm/plans.typeorm-entity';
import { PlansService } from './application/services/plans.service';
import { PlansController } from './presentation/controllers/plans.controller';

@Module({
    imports: [TypeOrmModule.forFeature([PlansTypeOrmEntity])],
    controllers: [PlansController],
    providers: [PlansService],
    exports: [PlansService],
})
export class PlansModule { }
