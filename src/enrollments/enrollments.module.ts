import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentsTypeOrmEntity } from './infrastructure/persistence/typeorm/enrollments.typeorm-entity';
import { EnrollmentsService } from './application/services/enrollments.service';
import { EnrollmentsController } from './presentation/controllers/enrollments.controller';

@Module({
    imports: [TypeOrmModule.forFeature([EnrollmentsTypeOrmEntity])],
    controllers: [EnrollmentsController],
    providers: [EnrollmentsService],
    exports: [EnrollmentsService],
})
export class EnrollmentsModule { }
