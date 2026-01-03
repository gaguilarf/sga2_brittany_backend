import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsTypeOrmEntity } from './infrastructure/persistence/typeorm/students.typeorm-entity';
import { StudentsService } from './application/services/students.service';
import { StudentsController } from './presentation/controllers/students.controller';

@Module({
    imports: [TypeOrmModule.forFeature([StudentsTypeOrmEntity])],
    controllers: [StudentsController],
    providers: [StudentsService],
    exports: [StudentsService],
})
export class StudentsModule { }
