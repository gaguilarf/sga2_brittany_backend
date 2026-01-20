import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceTypeOrmEntity } from './infrastructure/persistence/typeorm/attendance.typeorm-entity';
import { AttendanceService } from './application/services/attendance.service';
import { AttendanceController } from './presentation/controllers/attendance.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceTypeOrmEntity])],
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports: [AttendanceService],
})
export class AttendanceModule {}
