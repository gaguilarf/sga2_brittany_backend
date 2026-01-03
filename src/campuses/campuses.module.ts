import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampusesTypeOrmEntity } from './infrastructure/persistence/typeorm/campuses.typeorm-entity';
import { CampusesService } from './application/services/campuses.service';
import { CampusesController } from './presentation/controllers/campuses.controller';

@Module({
    imports: [TypeOrmModule.forFeature([CampusesTypeOrmEntity])],
    controllers: [CampusesController],
    providers: [CampusesService],
    exports: [CampusesService],
})
export class CampusesModule { }
