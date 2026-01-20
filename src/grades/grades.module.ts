import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradesTypeOrmEntity } from './infrastructure/persistence/typeorm/grades.typeorm-entity';
import { GradeDetailsTypeOrmEntity } from './infrastructure/persistence/typeorm/grade-details.typeorm-entity';
import { GradesService } from './application/services/grades.service';
import { GradesController } from './presentation/controllers/grades.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([GradesTypeOrmEntity, GradeDetailsTypeOrmEntity]),
  ],
  controllers: [GradesController],
  providers: [GradesService],
  exports: [GradesService],
})
export class GradesModule {}
