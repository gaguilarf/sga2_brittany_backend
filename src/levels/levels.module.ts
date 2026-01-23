import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelsTypeOrmEntity } from './infrastructure/persistence/typeorm/levels.typeorm-entity';
import { CyclesTypeOrmEntity } from './infrastructure/persistence/typeorm/cycles.typeorm-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LevelsTypeOrmEntity, CyclesTypeOrmEntity]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class LevelsModule {}
